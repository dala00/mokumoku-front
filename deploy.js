const Client = require('ssh2').Client;
const fs = require('fs');
const path = require('path');
const config = {
  host: 'host',
  port: 22,
  username: 'user',
  password: 'pass',
};


let action;

if (process.argv.length == 2) {
  action = 'deploy';
} else if (process.argv.length > 2) {
  if (process.argv[2] == 'rollback') {
    action = 'rollback';
  }
}
if (!action) {
  console.error('Called with wrong parameter "' + process.argv[2] + '"');
  process.exit(1);
}


const walk = (dir, done) => {
  var results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    var pending = list.length;
    if (!pending) return done(null, results);
    list.forEach(function(file) {
      file = path.resolve(dir, file);
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
            results = results.concat(res);
            if (!--pending) done(null, results);
          });
        } else {
          results.push(file);
          if (!--pending) done(null, results);
        }
      });
    });
  });
};

const end = (conn, err) => {
  conn.end();
  if (err) {
    console.trace(err);
    throw err;
  }
}

const connect = () => {
  return new Promise(resolve => {
    const conn = new Client();
    conn.on('ready', () => {
      console.log('Client :: ready');
      resolve(conn);
    })
    .connect(config);
  });
}

const exec = (conn, command) => {
  return new Promise(resolve => {
    conn.exec(command, (err, stream) => {
      var result = '';
      stream.on('close', (code, signal) => {
        resolve(result);
      })
      .on('data', (data) => {
        result += 'STDOUT: ' + data;
      })
      .stderr.on('data', (data) => {
        result += 'STDERR: ' + data;
      });
    });
  });
}

const upload = (conn, localPath, remotePath) => {
  return new Promise(resolve => {
    conn.sftp((err, sftp) => {
      if (err) end(conn, err);
      console.log('Sftp :: send ' + localPath + ' > ' + remotePath);
      sftp.fastPut(localPath, remotePath, {}, (err) => {
        if (err) end(conn, err);
        resolve();
      });
    })
  });
}

const deploy = (conn) => {
  exec(conn, 'rm -rf mokumoku_prepare')
  .then((result) => {
    console.log('Client :: Deleted prepare folder');
  })
  .then(() => {
    return new Promise(resolve => {
      walk(__dirname + '/dist', (err, files) => {
        if (err) end(conn, err);
        resolve(files);
      });
    })
  })
  .then((files) => {
    let sent = 0;
    const localBase = __dirname + '/dist/';
    return new Promise(resolve => {
      conn.sftp((err, sftp) => {
        if (err) end(conn, err);
        let promise = Promise.resolve();

        files.forEach(file => {
          const remotePath = file.replace(localBase, 'mokumoku_prepare/');

          promise = promise.then(() => new Promise(resolve3 => {
            let parts = remotePath.split('/');
            parts.pop();
            const folder = parts.join('/');
            exec(conn, 'mkdir -p ' + folder).then((result) => {
                resolve3();
            });
          }));

          promise = promise.then(() => new Promise(resolve2 => {
            console.log(file + ' > ' + remotePath);
            sftp.fastPut(file, remotePath, {}, (err) => {
              if (err) end(conn, err);
              resolve2();
            });
          }));

        });
        return promise.then(() => {
          resolve();
        });
      });
    });
  })
  .then(() => exec(conn, 'mv mokumoku_front mokumoku_front_bak'))
  .then((result) => exec(conn, 'mv mokumoku_prepare mokumoku_front'))
  .then((result) => exec(conn, 'mv mokumoku_front_bak mokumoku_prepare'))
  .then((result) => {
    console.log('Finished');
    end(conn);
  });
}

const rollback = (conn) => {
  exec(conn, 'mv mokumoku_front mokumoku_front_bak')
  .then((result) => exec(conn, 'mv mokumoku_prepare mokumoku_front'))
  .then((result) => exec(conn, 'mv mokumoku_front_bak mokumoku_prepare'))
  .then((result) => {
    console.log('Rollback finished');
    end(conn);
  });
}

connect().then((conn) => {
  if (action == 'deploy') {
    deploy(conn);
  } else if (action == 'rollback') {
    rollback(conn);
  }
});

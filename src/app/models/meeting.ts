import { User } from './user';
import { MeetingPost } from './meeting-post';
import { MeetingImage } from './meeting-image';
import { Tag } from './tag';
import * as moment from 'moment';

export class Meeting {
  id: number;
  user: User;
  meeting_posts: MeetingPost[];
  user_star: any;
  tags: Tag[];
  name: string;
  body: string;
  objective: string;
  result: string;
  start_time: Date;
  end_time: Date;
  star_count: number;
  private: boolean;
  closed: Date;
  created: Date;
  modified: Date;

  constructor(data?: Object) {
    if (data) {
      for (let key in data) {
        this[key] = data[key];
      }
    }
  }

  toObject() {
    let data: any = Object.assign({}, this);
    data.start_time = moment(data.start_time).format('YYYY-MM-DD HH:mm');
    data.end_time = moment(data.end_time).format('YYYY-MM-DD HH:mm');
    data.private = data.private ? 1 : 0;
    data.user = null;
    return data;
  }
}

import { Meeting } from './meeting';

export class MeetingPost {
  id: number;
  meeting_id: number;
  meeting: Meeting;
  body: string;
  private: boolean;
  created: Date;

  constructor(data?: Object) {
    if (data) {
      for (let key in data) {
        this[key] = data[key];
      }
    }
  }

  toObject() {
    let data: any = Object.assign({}, this);
    data.private = data.private ? 1 : 0;
    if (data.meeting) {
      delete data.meeting;
    }
    return data;
  }
}

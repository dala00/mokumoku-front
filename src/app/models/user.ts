import { Meeting } from './meeting';

export class User {
  id: number;
  meetings: Meeting[];
  name: string;
  email: string;
  intro: string;
  url: string;
  github_id: string;
  github_url: string;
  github_icon: string;
  twitter_id: string;
  twitter_url: string;
  twitter_icon: string;
  icon_select: string;

  constructor(data?: Object) {
    if (data) {
      for (let key in data) {
        this[key] = data[key];
      }
    }
  }
}

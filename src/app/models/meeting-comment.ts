import { User } from './user';

export class MeetingComment {
  id: number;
  meeting_id: number;
  user: User;
  body: string;
  created: Date;
}

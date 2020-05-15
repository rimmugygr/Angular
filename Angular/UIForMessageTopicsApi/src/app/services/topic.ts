import {Message} from './message';

export interface Topic {
  name: string;
  messages: Message[];
}

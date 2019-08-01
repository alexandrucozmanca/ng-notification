import { Moment } from 'moment';

export const enum Level {
  INFO = 'INFO',
  WARNING = 'WARNING',
  SEVERE = 'SEVERE'
}

export interface INotification {
  id?: string;
  ts?: Moment;
  title?: string;
  description?: string;
  icon?: string;
  level?: Level;
}

export class Notification implements INotification {
  constructor(
    public id?: string,
    public ts?: Moment,
    public title?: string,
    public description?: string,
    public icon?: string,
    public level?: Level
  ) {}
}

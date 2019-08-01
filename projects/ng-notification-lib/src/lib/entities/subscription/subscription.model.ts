import {Channel} from '../channel';

export interface ISubscription {
  id?: string;
  role?: string;
  topics?: Channel[];
}

export class Subscription implements ISubscription {
  constructor(public id?: string, public role?: string, public topics?: Channel[]) {}
}

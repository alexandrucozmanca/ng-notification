export const enum Type {
  TOPIC = 'Topic',
  DEVICE = 'Device'
}

export interface IChannel {
  value?: string;
  type?: Type;
}

export class Channel implements IChannel {
  constructor(public value?: string, public type?: Type) {}
}

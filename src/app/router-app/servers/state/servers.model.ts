export interface Server {
  id: number;
  name: string;
  status: string;
}

export enum ServerStatus {
  Online = 'online',
  Offline = 'offline',
}

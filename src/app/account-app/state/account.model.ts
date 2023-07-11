export enum AccountStatus {
  active = 'active',
  inactive = 'inactive',
  hidden = 'hidden',
}

export interface Account {
  id?: number;
  name: string;
  status: AccountStatus;
}

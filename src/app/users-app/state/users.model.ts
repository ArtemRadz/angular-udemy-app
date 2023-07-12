export enum UserStatus {
  active = 'active',
  inactive = 'inactive',
}

export interface User {
  id: number;
  name: string;
  status: UserStatus;
}

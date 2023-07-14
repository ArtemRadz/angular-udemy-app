import { Injectable } from '@angular/core';

import { User } from './users.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      name: 'Max',
    },
    {
      id: 2,
      name: 'Anna',
    },
    {
      id: 3,
      name: 'Chris',
    },
  ];

  getUsers() {
    return this.users;
  }

  getUser(id: unknown) {
    const numberID = Number(id);

    if (isNaN(numberID)) {
      return null;
    }

    return this.users.find(user => user.id === numberID);
  }
}

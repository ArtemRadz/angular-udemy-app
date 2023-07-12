import { EventEmitter, Injectable } from '@angular/core';

import { User, UserStatus } from './users.model';
import { CounterService } from './counter.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private id = 0;

  users: User[] = [
    { id: ++this.id, name: 'Max', status: UserStatus.active },
    { id: ++this.id, name: 'Anna', status: UserStatus.active },
    { id: ++this.id, name: 'Chris', status: UserStatus.inactive },
    { id: ++this.id, name: 'Manu', status: UserStatus.inactive },
  ];

  userStatusChanged = new EventEmitter<void>();

  constructor(private counterService: CounterService) {}

  getActiveUsers() {
    return this.users.filter((u: User) => u.status === UserStatus.active);
  }

  getInactiveUsers() {
    return this.users.filter((u: User) => u.status === UserStatus.inactive);
  }

  changeStatus(id: number, status: UserStatus) {
    const user = this.users.find((user: User) => user.id === id);

    if (user?.status) {
      user.status = status;
      this.userStatusChanged.emit();
      if (status === UserStatus.active) {
        this.counterService.addToActive();
      } else {
        this.counterService.addToInactive();
      }
    }
  }
}

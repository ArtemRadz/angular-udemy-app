import { Injectable } from '@angular/core';

import { Account, AccountStatus } from './account.model';
import { LoggingService } from 'src/app/shared/services/logging-service.service';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private id = 0;

  accounts: Account[] = [
    { id: ++this.id, name: 'Active Account', status: AccountStatus.active },
    { id: ++this.id, name: 'Inactive Account', status: AccountStatus.inactive },
    { id: ++this.id, name: 'Hidden Account', status: AccountStatus.hidden },
  ];

  constructor(private logginsService: LoggingService) {}

  getAccounts() {
    return this.accounts;
  }

  addAccount(account: Account) {
    account.id = ++this.id;
    this.accounts.push(account);

    this.logginsService.log(
      'A server status changed, new status: ' + account.status
    );
  }

  updateAccountStatus(id: number, status: AccountStatus) {
    const account = this.accounts.find((ac: Account) => ac.id === id);

    if (account?.status) {
      account.status = status;
      this.logginsService.log('A server status changed, new status: ' + status);
    }
  }
}

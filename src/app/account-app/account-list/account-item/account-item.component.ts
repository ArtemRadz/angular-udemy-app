import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { Account, AccountStatus } from '../../state/account.model';

@Component({
  selector: 'app-account-item',
  standalone: true,
  templateUrl: './account-item.component.html',
  styleUrls: ['./account-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountItemComponent {
  @Input() account!: Account;
  @Output() changedStatus = new EventEmitter<AccountStatus>();

  accountStatus = AccountStatus;
}

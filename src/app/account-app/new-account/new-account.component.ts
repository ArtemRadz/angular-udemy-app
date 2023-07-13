import {
  ChangeDetectionStrategy,
  Component,
  Output,
  EventEmitter,
} from '@angular/core';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Account, AccountStatus } from '../state/account.model';

import { SelectComponent } from 'src/app/shared/ui/select/select.component';
import { SelectOptionComponent } from 'src/app/shared/ui/select/select-option/select-option.component';

@Component({
  selector: 'app-new-account',
  standalone: true,
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.scss'],
  imports: [FormsModule, NgFor, SelectComponent, SelectOptionComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewAccountComponent {
  @Output() addedAccount = new EventEmitter<Account>();

  name = '';
  selectedStatus = AccountStatus.active;
  statusArray = [
    AccountStatus.active,
    AccountStatus.inactive,
    AccountStatus.hidden,
  ];

  onAdd() {
    this.addedAccount.emit({ name: this.name, status: this.selectedStatus });
    this.resetForm();
  }

  private resetForm() {
    this.name = '';
    this.selectedStatus = AccountStatus.active;
  }
}

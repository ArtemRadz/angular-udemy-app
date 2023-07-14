import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { User, UserStatus } from '../state/users.model';
import { UsersService } from '../state/users.service';

@Component({
  selector: 'app-inactive-users',
  templateUrl: './inactive-users.component.html',
  styleUrls: ['./inactive-users.component.scss'],
  imports: [NgFor],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InactiveUsersComponent {
  @Input() users!: User[];

  constructor(private usersService: UsersService) {}

  onChangeStatus(id: number) {
    this.usersService.changeStatus(id, UserStatus.active);
  }
}

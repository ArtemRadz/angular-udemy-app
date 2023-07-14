import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

import { User } from './state/users.model';
import { UsersService } from './state/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  imports: [NgFor, RouterLink],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent implements OnInit {
  users!: User[];

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.users = this.usersService.getUsers();
  }
}

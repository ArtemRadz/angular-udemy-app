import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from '../state/users.model';
import { UsersService } from '../state/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  imports: [NgIf],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent implements OnInit {
  user!: User | undefined | null;

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const user = this.usersService.getUser(
      this.route.snapshot.paramMap.get('id')
    );

    if (user) {
      this.user = user;
    } else {
      this.router.navigate(['/error']);
    }
  }
}

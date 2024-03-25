import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterLink } from '@angular/router';

import { User } from '../state/users.model';
import { UsersService } from '../state/users.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  imports: [RouterLink],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent implements OnInit, OnDestroy {
  user!: User | undefined | null;
  activatedRouteSubscription!: Subscription;

  constructor(
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private readonly cf: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.activatedRouteSubscription = this.activatedRoute.paramMap.subscribe(
      (paramMap: ParamMap) => {
        this.getUser(paramMap.get('id'));
      }
    );
  }

  ngOnDestroy() {
    this.activatedRouteSubscription?.unsubscribe();
  }

  private getUser(id: unknown) {
    const user = this.usersService.getUser(id);

    if (user) {
      this.user = user;
      this.cf.markForCheck();
    } else {
      this.router.navigate(['/error']);
    }
  }
}

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Data, Router, RouterLink } from '@angular/router';

import { Subscription } from 'rxjs';

import { Server } from '../state/servers.model';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss'],
  imports: [RouterLink],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServerComponent implements OnInit, OnDestroy {
  server!: Server;
  activatedRouteSubscription!: Subscription;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly cf: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.activatedRouteSubscription = this.activatedRoute.data.subscribe(
      (data: Data) => {
        const server = data['server'];

        if (server) {
          this.server = server;
          this.cf.markForCheck();
        } else {
          this.router.navigate(['/error']);
        }
      }
    );
  }

  ngOnDestroy() {
    this.activatedRouteSubscription.unsubscribe();
  }
}

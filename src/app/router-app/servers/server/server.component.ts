import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { NgIf } from '@angular/common';
import { ActivatedRoute, ParamMap, Router, RouterLink } from '@angular/router';

import { Subscription } from 'rxjs';

import { ServersService } from '../state/servers.service';
import { Server } from '../state/servers.model';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss'],
  imports: [NgIf, RouterLink],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServerComponent implements OnInit, OnDestroy {
  server!: Server;
  activatedRouteSubscription!: Subscription;

  constructor(
    private readonly serversService: ServersService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly cf: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.activatedRouteSubscription = this.activatedRoute.paramMap.subscribe(
      (paramMap: ParamMap) => {
        const server = this.serversService.getServer(paramMap.get('id'));

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

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { ServersService } from '../state/servers.service';
import { Server } from '../state/servers.model';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServerComponent implements OnInit {
  server!: Server;

  constructor(private serversService: ServersService) {}

  ngOnInit() {
    const server = this.serversService.getServer(1);

    if (server) {
      this.server = server;
    }
  }
}

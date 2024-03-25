import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { ServersService } from './state/servers.service';
import { Server } from './state/servers.model';
import { ServerComponent } from './server/server.component';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.scss'],
  imports: [RouterLink, ServerComponent, RouterOutlet],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServersComponent implements OnInit {
  public servers!: Server[];

  constructor(private serversService: ServersService) {}

  ngOnInit() {
    this.servers = this.serversService.getServers();
  }
}

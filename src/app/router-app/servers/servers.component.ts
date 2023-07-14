import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';

import { ServersService } from './state/servers.service';
import { EditServerComponent } from './edit-server/edit-server.component';
import { ServerComponent } from './server/server.component';
import { Server } from './state/servers.model';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.scss'],
  imports: [NgFor, EditServerComponent, ServerComponent],
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

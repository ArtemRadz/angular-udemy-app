import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ServersService } from '../state/servers.service';
import { SelectComponent } from 'src/app/shared/ui/select/select.component';
import { SelectOptionComponent } from 'src/app/shared/ui/select/select-option/select-option.component';
import { Server, ServerStatus } from '../state/servers.model';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.scss'],
  imports: [NgFor, FormsModule, SelectComponent, SelectOptionComponent],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditServerComponent implements OnInit {
  server!: Server;
  serverName = '';
  serverStatus = '';

  serverStatusData = [ServerStatus.Online, ServerStatus.Offline];

  constructor(private serversService: ServersService) {}

  ngOnInit() {
    const server = this.serversService.getServer(1);

    if (server) {
      this.server = server;
      this.serverName = this.server.name;
      this.serverStatus = this.server.status;
    }
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {
      name: this.serverName,
      status: this.serverStatus,
    });
  }
}

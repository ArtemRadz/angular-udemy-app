import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { ServersService } from '../state/servers.service';
import { SelectComponent } from 'src/app/shared/ui/select/select.component';
import { SelectOptionComponent } from 'src/app/shared/ui/select/select-option/select-option.component';
import { Server, ServerStatus } from '../state/servers.model';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.scss'],
  imports: [NgIf, NgFor, FormsModule, SelectComponent, SelectOptionComponent],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditServerComponent implements OnInit {
  server!: Server;
  serverName = '';
  serverStatus = '';
  allowEdit = false;

  serverStatusData = [ServerStatus.Online, ServerStatus.Offline];

  constructor(
    private serversService: ServersService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe((paramMap: ParamMap) => {
      this.allowEdit = paramMap.get('allowEdit') === '1';
    });

    const server = this.serversService.getServer(
      this.activatedRoute.snapshot.paramMap.get('id')
    );

    if (server) {
      this.server = server;
      this.serverName = this.server.name;
      this.serverStatus = this.server.status;
    } else {
      this.router.navigate(['/error']);
    }
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {
      name: this.serverName,
      status: this.serverStatus,
    });
    this.router.navigate(['/router-app/servers']);
  }
}

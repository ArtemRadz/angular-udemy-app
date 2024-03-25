import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
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
  imports: [FormsModule, SelectComponent, SelectOptionComponent],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditServerComponent implements OnInit {
  server!: Server;
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  changesSaved = false;

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
    this.changesSaved = true;
    this.router.navigate(['/router-app/servers']);
  }

  canDeactivate() {
    if (!this.allowEdit) {
      return true;
    }

    if (
      (this.server.name !== this.serverName ||
        this.server.status !== this.serverStatus) &&
      !this.changesSaved
    ) {
      return confirm('Do you want to discard the changes?');
    } else {
      return true;
    }

    return true;
  }
}

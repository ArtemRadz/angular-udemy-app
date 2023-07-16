import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Server } from '../state/servers.model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss'],
  imports: [NgIf],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServerComponent {
  @Input() server!: Server;
}

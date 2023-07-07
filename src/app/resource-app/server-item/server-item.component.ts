import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Resource, ResourceType } from '../state/server.model';

@Component({
  selector: 'app-server-item',
  standalone: true,
  templateUrl: './server-item.component.html',
  styleUrls: ['./server-item.component.scss'],
  imports: [NgIf],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServerItemComponent {
  @Input() resource!: Resource;

  resourceType = ResourceType;
}

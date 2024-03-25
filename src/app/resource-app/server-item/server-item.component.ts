import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';

import { Resource, ResourceType } from '../state/server.model';

@Component({
  selector: 'app-server-item',
  templateUrl: './server-item.component.html',
  styleUrls: ['./server-item.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServerItemComponent {
  @Input() resource!: Resource;
  @ViewChild('heading', { static: true }) header!: ElementRef;
  @ContentChild('contentChild', { static: true }) contentChild!: ElementRef;

  resourceType = ResourceType;
}

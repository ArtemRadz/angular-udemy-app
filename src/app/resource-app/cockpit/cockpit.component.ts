import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Resource, ResourceType } from '../state/server.model';

@Component({
  selector: 'app-cockpit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CockpitComponent {
  @Output() createdResource = new EventEmitter<Resource>();
  resourceType = ResourceType;

  resourceName = '';
  resourceContent = '';

  onAddResource(resourceType: ResourceType) {
    this.createdResource.emit({
      type: resourceType,
      name: this.resourceName,
      content: this.resourceContent,
    });
  }
}

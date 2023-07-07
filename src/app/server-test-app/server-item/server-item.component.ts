import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-server-item',
  standalone: true,
  templateUrl: './server-item.component.html',
  styleUrls: ['./server-item.component.scss'],
  imports: [NgIf],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServerItemComponent {
  @Input() server!: any;
}

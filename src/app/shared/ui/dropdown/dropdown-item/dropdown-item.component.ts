import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-dropdown-item',
  standalone: true,
  templateUrl: './dropdown-item.component.html',
  styleUrls: ['./dropdown-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownItemComponent {
  @Output() itemClicked = new EventEmitter<void>();

  onClick() {
    this.itemClicked.emit();
  }
}

import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';

import { PAGE_TITLE } from '../constants';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Output() featureSelected = new EventEmitter<PAGE_TITLE>();
  PAGE_TITLE = PAGE_TITLE;
  active = PAGE_TITLE.RECIPES;

  onSelectedFeature(path: PAGE_TITLE) {
    this.active = path;
    this.featureSelected.emit(path);
  }
}

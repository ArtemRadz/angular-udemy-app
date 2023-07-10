import { NgIf } from '@angular/common';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  QueryList,
} from '@angular/core';

import { DropdownOptionComponent } from '../dropdown-option/dropdown-option.component';
import { Subscription, startWith } from 'rxjs';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  imports: [NgIf],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownComponent implements AfterContentInit {
  value!: string | null;
  dropdownOpen = false;

  @ContentChildren(DropdownOptionComponent)
  data!: QueryList<DropdownOptionComponent>;

  subs = new Subscription();

  compareWith: (val1: any, val2: any) => boolean = (v1, v2) => v1 === v2;

  ngAfterContentInit() {
    this.data.changes.pipe(startWith([])).subscribe(() => {
      setTimeout(() => {
        this.selectOption(this.value);
      }, 1);

      this.unsubscribeSelectedEvents();
      this.subs = new Subscription();
      this.subscribeSelectedEvents();
    });
  }

  subscribeSelectedEvents() {
    this.data.forEach((t: DropdownOptionComponent) => {
      this.subs.add(
        t.selectedStateChange.subscribe(value => {
          this.unselectPrevious();
          t.selected = true;
          this.value = t.innerText;
          this.closeDropdown();
        })
      );
    });
  }

  unsubscribeSelectedEvents() {
    this.subs.unsubscribe();
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  closeDropdown() {
    this.dropdownOpen = false;
  }

  private selectOption(value: any) {
    if (this.data && value !== undefined) {
      const shouldSelect = this.data.find(c =>
        this.compareWith(c.value, value)
      );
      if (shouldSelect) {
        shouldSelect.selected = true;
        this.value = shouldSelect.innerText;
      }
    }
  }

  private unselectPrevious() {
    this.value = null;
    const comp = this.data.find(c => this.compareWith(c.value, this.value));
    if (comp) {
      comp.selected = false;
    }
  }
}

import { NgIf } from '@angular/common';
import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  forwardRef,
  inject,
  QueryList,
} from '@angular/core';

import { DropdownOptionComponent } from '../dropdown-option/dropdown-option.component';
import { Subscription, startWith } from 'rxjs';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  imports: [NgIf],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true,
    },
  ],
})
export class DropdownComponent
  implements AfterContentInit, ControlValueAccessor
{
  displayValue!: string | null;
  dropdownOpen = false;

  @ContentChildren(DropdownOptionComponent)
  data!: QueryList<DropdownOptionComponent>;

  subs = new Subscription();

  protected _onChange!: (_: any) => void;
  protected _onTouched!: () => void;
  protected _value!: any | undefined;
  protected _disabled = false;

  protected readonly cf = inject(ChangeDetectorRef);

  get value() {
    return this._value;
  }

  get disabled(): boolean {
    return this._disabled;
  }

  writeValue(obj: any | undefined): void {
    this._value = obj;
    this.cf.markForCheck();
  }

  registerOnChange(fn: (_: any) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this._disabled = disabled;
  }

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
          this.displayValue = t.innerText;
          this.select(value);
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

  select(value: any) {
    this._value = value;
    this._onChange(this._value);
    this.closeDropdown();
  }

  private selectOption(value: any) {
    if (this.data && value !== undefined) {
      const shouldSelect = this.data.find(c => value === c.value);
      if (shouldSelect) {
        shouldSelect.selected = true;
        this.displayValue = shouldSelect.innerText;
      }
    }
  }

  private unselectPrevious() {
    this.displayValue = null;
    this.data.forEach(comp => {
      comp.selected = false;
    });
  }
}

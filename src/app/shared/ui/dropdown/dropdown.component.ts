import { NgIf } from '@angular/common';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  forwardRef,
  HostListener,
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownComponent
  implements AfterContentInit, ControlValueAccessor
{
  private readonly elRef = inject(ElementRef);

  private _onChange!: (_: unknown) => void;
  private _onTouched!: () => void;
  private _value!: unknown | undefined;
  private _disabled = false;

  displayValue!: string | null;
  dropdownOpen = false;

  @ContentChildren(DropdownOptionComponent)
  data!: QueryList<DropdownOptionComponent>;

  subs = new Subscription();

  @HostListener('document:click', ['$event'])
  @HostListener('document:touchend', ['$event'])
  outsideClick(event: Event) {
    if (!this.elRef.nativeElement.contains(event.target)) {
      this.closeDropdown();
    }
  }

  get value() {
    return this._value;
  }

  get disabled() {
    return this._disabled;
  }

  writeValue(obj: unknown | undefined) {
    this.unselectPrevious();
    this.selectOption(obj);
    this._value = obj;
  }

  registerOnChange(fn: (_: unknown) => void) {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this._onTouched = fn;
  }

  setDisabledState(disabled: boolean) {
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

  select(value: unknown) {
    this._value = value;
    this._onChange(this._value);
    this.closeDropdown();
  }

  private compareWith: (val1: unknown, val2: unknown) => boolean = (v1, v2) =>
    v1 === v2;

  private selectOption(value: unknown) {
    if (this.data && value !== undefined) {
      const shouldSelect = this.data.find(c =>
        this.compareWith(c.value, value)
      );
      if (shouldSelect) {
        shouldSelect.selected = true;
        this.displayValue = shouldSelect.innerText;
      }
    }
  }

  private unselectPrevious() {
    this.displayValue = null;
    const comp = this.data?.find(c => this.compareWith(c.value, this.value));
    if (comp) {
      comp.selected = false;
    }
  }
}
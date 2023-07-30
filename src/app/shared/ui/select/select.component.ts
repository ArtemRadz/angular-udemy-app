import { NgClass, NgIf } from '@angular/common';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  forwardRef,
  HostListener,
  inject,
  QueryList,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { Subscription, startWith } from 'rxjs';

import { SelectOptionComponent } from './select-option/select-option.component';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';

@Component({
  selector: 'app-select',
  standalone: true,
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  imports: [NgClass, NgIf, ClickOutsideDirective],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent implements AfterContentInit, ControlValueAccessor {
  private readonly elRef = inject(ElementRef);
  private readonly cf = inject(ChangeDetectorRef);

  private _onChange!: (_: unknown) => void;
  private _onTouched!: () => void;
  private _value!: unknown | undefined;
  private _disabled = false;

  displayValue!: string | null;
  selectOpen = false;

  @ContentChildren(SelectOptionComponent)
  data!: QueryList<SelectOptionComponent>;

  subs = new Subscription();

  @HostListener('document:click', ['$event'])
  @HostListener('document:touchend', ['$event'])
  outsideClick(event: Event) {
    if (!this.elRef.nativeElement.contains(event.target)) {
      this.closeSelect();
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
    this.data.forEach((t: SelectOptionComponent) => {
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
    this.subs?.unsubscribe();
  }

  toggleSelect() {
    this.selectOpen = !this.selectOpen;
  }

  closeSelect() {
    this.selectOpen = false;
  }

  select(value: unknown) {
    this._value = value;
    this._onChange(this._value);
    this.closeSelect();
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
        this.cf.markForCheck();
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

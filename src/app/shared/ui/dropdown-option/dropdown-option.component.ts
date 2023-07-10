import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Highlightable } from '@angular/cdk/a11y';

@Component({
  selector: 'app-dropdown-option',
  standalone: true,
  templateUrl: './dropdown-option.component.html',
  styleUrls: ['./dropdown-option.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownOptionComponent implements Highlightable {
  @Input() value!: any;
  @Output() selectedStateChange = new EventEmitter();

  focused = false;

  private _selected = false;

  constructor(
    private readonly el: ElementRef,
    private readonly cf: ChangeDetectorRef
  ) {}

  get selected(): boolean {
    return this._selected;
  }

  set selected(value: boolean) {
    this._selected = value;
    this.cf.markForCheck();
  }

  onClickEvent() {
    this.selectedStateChange.emit(this.value);
  }

  get innerText() {
    return this.el?.nativeElement.innerText;
  }

  setActiveStyles(): void {
    this.focused = true;
    this.cf.markForCheck();
  }

  setInactiveStyles(): void {
    this.focused = false;
    this.cf.markForCheck();
  }
}

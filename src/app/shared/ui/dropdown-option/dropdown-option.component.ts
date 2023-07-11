import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-dropdown-option',
  standalone: true,
  templateUrl: './dropdown-option.component.html',
  styleUrls: ['./dropdown-option.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownOptionComponent {
  @Input() value!: unknown;
  @Output() selectedStateChange = new EventEmitter();

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

  get innerText() {
    return this.el?.nativeElement.innerText;
  }

  onClickEvent() {
    this.selectedStateChange.emit(this.value);
  }
}

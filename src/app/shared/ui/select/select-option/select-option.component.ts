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
  selector: 'app-select-option',
  standalone: true,
  templateUrl: './select-option.component.html',
  styleUrls: ['./select-option.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectOptionComponent {
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

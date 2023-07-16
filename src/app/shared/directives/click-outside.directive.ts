import {
  Directive,
  ElementRef,
  EventEmitter,
  inject,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { fromEvent, merge, Subscription } from 'rxjs';

@Directive({
  selector: '[appClickOutside]',
  standalone: true,
})
export class ClickOutsideDirective implements OnInit, OnDestroy {
  @Output() clickedOutside = new EventEmitter<void>();

  private readonly elRef = inject(ElementRef);
  private readonly document = inject(DOCUMENT);

  private readonly subs = new Subscription();

  ngOnInit() {
    this.subs.add(
      merge(
        fromEvent(this.document, 'click'),
        fromEvent(this.document, 'touchend')
      ).subscribe((event: Event) => {
        if (!this.elRef.nativeElement.contains(event.target)) {
          this.clickedOutside.emit();
        }
      })
    );
  }

  ngOnDestroy() {
    this.subs?.unsubscribe();
  }
}

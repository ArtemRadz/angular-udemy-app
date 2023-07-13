import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  Input,
  OnDestroy,
  QueryList,
} from '@angular/core';
import { NgClass } from '@angular/common';

import { Subscription } from 'rxjs';

import { DropdownItemComponent } from './dropdown-item/dropdown-item.component';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  imports: [NgClass, ClickOutsideDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownComponent implements AfterContentInit, OnDestroy {
  @Input() title!: string;
  @ContentChildren(DropdownItemComponent)
  dropdownItems!: QueryList<DropdownItemComponent>;

  subs = new Subscription();
  isDropdownOpen = false;

  constructor(private readonly cf: ChangeDetectorRef) {}

  ngAfterContentInit() {
    this.dropdownItems.forEach(item => {
      this.subs.add(item.itemClicked.subscribe(() => this.closeDropdown()));
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  closeDropdown() {
    this.isDropdownOpen = false;
    this.cf.markForCheck();
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}

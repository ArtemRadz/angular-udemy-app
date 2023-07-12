import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ShoppingListService } from '../state/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  standalone: true,
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss'],
  imports: [FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShoppingEditComponent {
  @ViewChild('nameInput') nameInputRef!: ElementRef;
  @ViewChild('amountInput') amountInputRef!: ElementRef;

  constructor(private shoppingListService: ShoppingListService) {}

  onAdd() {
    this.shoppingListService.addIngredient(
      this.nameInputRef.nativeElement.value,
      this.amountInputRef.nativeElement.value
    );
  }
}

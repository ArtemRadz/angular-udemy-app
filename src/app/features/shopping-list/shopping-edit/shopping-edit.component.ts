import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ShoppingListService } from '../state/shopping-list.service';
import { Ingredient } from 'src/app/shared/models/ingredient.model';

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
      new Ingredient(
        this.nameInputRef.nativeElement.value,
        Number(this.amountInputRef.nativeElement.value)
      )
    );
  }
}

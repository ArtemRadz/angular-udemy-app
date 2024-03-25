import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { startWith } from 'rxjs';

import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListService } from './state/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  standalone: true,
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
  imports: [ShoppingEditComponent, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShoppingListComponent {
  ingredients$ = this.shoppingListService.ingredientChanged.pipe(
    startWith(this.shoppingListService.getIngredients())
  );

  constructor(private shoppingListService: ShoppingListService) {}

  onEditItem(index: number) {
    this.shoppingListService.startedEditing.next(index);
  }
}

import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { RecipesService } from '../state/recipes.service';
import { ShoppingListService } from '../../shopping-list/state/shopping-list.service';
import { Ingredient } from 'src/app/shared/models/ingredient.model';
import { DropdownComponent } from 'src/app/shared/ui/dropdown/dropdown.component';
import { DropdownItemComponent } from 'src/app/shared/ui/dropdown/dropdown-item/dropdown-item.component';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
  imports: [NgFor, NgIf, AsyncPipe, DropdownComponent, DropdownItemComponent],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeDetailComponent {
  recipeSelected = this.recipesService.recipeSelected;

  constructor(
    private recipesService: RecipesService,
    private shoppingListService: ShoppingListService
  ) {}

  onShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}

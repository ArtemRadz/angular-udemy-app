import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { ShoppingListService } from '../../shopping-list/state/shopping-list.service';
import { Ingredient } from 'src/app/shared/models/ingredient.model';
import { DropdownComponent } from 'src/app/shared/ui/dropdown/dropdown.component';
import { DropdownItemComponent } from 'src/app/shared/ui/dropdown/dropdown-item/dropdown-item.component';
import { Recipe } from '../state/recipe.model';
import { RecipesService } from '../state/recipes.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
  imports: [NgFor, NgIf, AsyncPipe, DropdownComponent, DropdownItemComponent],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  recipe!: Recipe;
  activatedRouteSubscription!: Subscription;

  constructor(
    private shoppingListService: ShoppingListService,
    private recipesService: RecipesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private cf: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.activatedRouteSubscription = this.activatedRoute.data.subscribe(
      (data: Data) => {
        const recipe = data['recipe'];

        if (recipe) {
          this.recipe = recipe;
          this.cf.markForCheck();
        } else {
          this.router.navigate(['/error']);
        }
      }
    );
  }

  ngOnDestroy() {
    this.activatedRouteSubscription.unsubscribe();
  }

  onShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  onEdit() {
    this.router.navigate(['edit'], { relativeTo: this.activatedRoute });
  }

  onDelete() {
    this.recipesService.deleteRecipeById(this.recipe.id);
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }
}

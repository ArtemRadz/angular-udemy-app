import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { Recipe } from '../state/recipe.model';
import { RecipesService } from '../state/recipes.service';
import { RecipeItemComponent } from './recipe-item/recipe-item.component';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
  imports: [RecipeItemComponent, NgFor],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeListComponent implements OnInit {
  recipes!: Recipe[];

  constructor(private recipesService: RecipesService) {}

  ngOnInit() {
    this.recipes = this.recipesService.getRecipes();
  }

  onSelectRecipe(recipe: Recipe) {
    this.recipesService.selectRecipe(recipe);
  }
}

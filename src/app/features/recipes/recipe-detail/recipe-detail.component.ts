import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { RecipesService } from '../state/recipes.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
  imports: [NgIf, AsyncPipe],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeDetailComponent {
  recipeSelected = this.recipesService.recipeSelected;

  constructor(private recipesService: RecipesService) {}
}

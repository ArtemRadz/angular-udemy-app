import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Recipe } from '../state/recipe.model';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeDetailComponent {
  @Input() recipe!: Recipe;
}

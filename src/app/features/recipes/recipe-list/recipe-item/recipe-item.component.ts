import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Recipe } from '../../state/recipe.model';

@Component({
  selector: 'app-recipe-item',
  standalone: true,
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeItemComponent {
  @Input() recipe!: Recipe;
}

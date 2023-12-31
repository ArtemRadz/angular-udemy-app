import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-recipe-start',
  standalone: true,
  templateUrl: './recipe-start.component.html',
  styleUrls: ['./recipe-start.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeStartComponent {}

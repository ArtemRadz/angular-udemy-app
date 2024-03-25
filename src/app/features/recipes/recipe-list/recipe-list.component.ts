import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { startWith } from 'rxjs';

import { RecipesService } from '../state/recipes.service';
import { RecipeItemComponent } from './recipe-item/recipe-item.component';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
  imports: [RecipeItemComponent, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeListComponent {
  recipes$ = this.recipesService.recipesChanged.pipe(
    startWith(this.recipesService.getRecipes())
  );

  constructor(
    private recipesService: RecipesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  onNewRecipe() {
    this.router.navigate(['add'], { relativeTo: this.activatedRoute });
  }
}

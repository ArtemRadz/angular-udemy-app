import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { notEmptyValidator } from 'src/app/shared/validators/not-empty.validator';
import { Recipe } from '../state/recipe.model';
import { RecipesService } from '../state/recipes.service';

@Component({
  selector: 'app-recipe-edit',
  standalone: true,
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss'],
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeEditComponent implements OnInit {
  editMode = false;
  id!: number;
  recipeForm!: FormGroup;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly recipesService: RecipesService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.activatedRoute.snapshot.paramMap.get('id')) {
      this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
      this.editMode = true;
    }
    this.initForm();
  }

  onSubmit() {
    const recipe = new Recipe(
      this.editMode ? this.id : ++RecipesService.id,
      this.recipeForm.value['name'],
      this.recipeForm.value['description'],
      this.recipeForm.value['imageURL'],
      this.recipeForm.value['ingredients']
    );
    if (this.editMode) {
      this.recipesService.updateRecipeById(this.id, recipe);
    } else {
      this.recipesService.addRecipe(recipe);
    }

    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }

  onDelete(index: number) {
    this.ingredients.removeAt(index);
  }

  onAddIngredient() {
    this.ingredients.push(
      this.formBuilder.group({
        name: [null, notEmptyValidator],
        amount: [null, [notEmptyValidator, Validators.min(1)]],
      })
    );
  }

  get ingredients() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  get ingredientsControl() {
    return this.recipeForm.controls['ingredients'] as FormArray;
  }

  private initForm() {
    let recipeName = '';
    let recipeImageURL = '';
    let recipeDescription = '';
    const recipeIngredients = this.formBuilder.array([]);

    if (this.editMode) {
      const recipe = this.recipesService.getRecipeById(this.id);

      if (recipe) {
        recipeName = recipe.name;
        recipeImageURL = recipe.imagePath;
        recipeDescription = recipe.desc;
        if (recipe.ingredients) {
          for (const ingredient of recipe.ingredients) {
            recipeIngredients.push(
              //@ts-ignore
              this.formBuilder.group({
                name: [ingredient.name, notEmptyValidator],
                amount: [
                  ingredient.amount,
                  [notEmptyValidator, Validators.min(1)],
                ],
              })
            );
          }
        }
      }
    }

    this.recipeForm = this.formBuilder.group({
      name: [recipeName, [notEmptyValidator]],
      description: [recipeDescription, [notEmptyValidator]],
      imageURL: [recipeImageURL, [notEmptyValidator]],
      ingredients: recipeIngredients,
    });
  }
}

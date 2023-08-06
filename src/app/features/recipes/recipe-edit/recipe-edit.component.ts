import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { notEmptyValidator } from 'src/app/shared/validators/not-empty.validator';
import { RecipesService } from '../state/recipes.service';

@Component({
  selector: 'app-recipe-edit',
  standalone: true,
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss'],
  imports: [NgFor, NgIf, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeEditComponent implements OnInit {
  editMode = false;
  id!: number;
  recipeForm!: FormGroup;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly recipesService: RecipesService
  ) {}

  ngOnInit() {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.editMode = this.id != null;
    this.initForm();
  }

  onSubmit() {
    console.dir(this.recipeForm);
  }

  onCancel() {
    console.log('cancel');
  }

  get recipeIngredients() {
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
                amount: [ingredient.amount, Validators.min(1)],
              })
            );
          }
        }
      }
    }

    this.recipeForm = this.formBuilder.group({
      name: [recipeName, [notEmptyValidator]],
      imageURL: [recipeImageURL, [notEmptyValidator]],
      description: [recipeDescription, [notEmptyValidator]],
      ingredients: recipeIngredients,
    });
  }
}

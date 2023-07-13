import { Ingredient } from 'src/app/shared/models/ingredient.model';

export class Recipe {
  constructor(
    public name: string,
    public desc: string,
    public imagePath: string,
    public ingredients: Ingredient[]
  ) {}
}

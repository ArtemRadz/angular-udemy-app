import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { AuthService } from 'src/app/shared/services/auth.service';
import { DropdownItemComponent } from 'src/app/shared/ui/dropdown/dropdown-item/dropdown-item.component';
import { DropdownComponent } from 'src/app/shared/ui/dropdown/dropdown.component';
import { RecipesService } from '../recipes/state/recipes.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [
    RouterLinkActive,
    RouterLink,
    NgIf,
    AsyncPipe,
    DropdownItemComponent,
    DropdownComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  constructor(
    private authService: AuthService,
    private recipesService: RecipesService
  ) {}

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }

  save() {
    this.recipesService.storeRecipes();
  }

  fetch() {
    this.recipesService.fetchRecipes().subscribe();
  }
}

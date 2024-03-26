import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { DropdownItemComponent } from 'src/app/shared/ui/dropdown/dropdown-item/dropdown-item.component';
import { DropdownComponent } from 'src/app/shared/ui/dropdown/dropdown.component';
import { RecipesService } from '../recipes/state/recipes.service';
import { AuthService } from '../auth/state/auth.service';
import { AuthQuery } from '../auth/state/auth.query';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [
    RouterLinkActive,
    RouterLink,
    AsyncPipe,
    DropdownItemComponent,
    DropdownComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  protected readonly isAuthenticated = this.authQuery.isAuthenticated;

  constructor(
    private readonly authService: AuthService,
    private readonly authQuery: AuthQuery,
    private readonly recipesService: RecipesService
  ) {}

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

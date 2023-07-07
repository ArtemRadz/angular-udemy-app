import { FormsModule } from '@angular/forms';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIf, NgStyle, NgClass, NgFor } from '@angular/common';

import { HeaderComponent } from './features/header/header.component';
import { RecipesComponent } from './features/recipes/recipes.component';
import { ShoppingListComponent } from './features/shopping-list/shopping-list.component';
import { CockpitComponent } from './server-test-app/cockpit/cockpit.component';
import { ServerItemComponent } from './server-test-app/server-item/server-item.component';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    FormsModule,
    HeaderComponent,
    NgStyle,
    NgClass,
    NgIf,
    NgFor,
    RecipesComponent,
    ShoppingListComponent,
    CockpitComponent,
    ServerItemComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  servers: any[] = [];

  addServer(server: any) {
    this.servers.push(server);
  }
}

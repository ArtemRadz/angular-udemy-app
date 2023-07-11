import { FormsModule } from '@angular/forms';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgIf, NgStyle, NgClass, NgFor } from '@angular/common';

import { HeaderComponent } from './features/header/header.component';
import { RecipesComponent } from './features/recipes/recipes.component';
import { ShoppingListComponent } from './features/shopping-list/shopping-list.component';

// import { Resource, ResourceType } from './resource-app/state/server.model';
import { CockpitComponent } from './resource-app/cockpit/cockpit.component';
import { ServerItemComponent } from './resource-app/server-item/server-item.component';
import { PAGE_TITLE } from './features/constants';
import { HighlightDirective } from './shared/directives/highlight.directive';
import { UnlessDirective } from './shared/directives/unless.directive';
import { DropdownComponent } from './shared/ui/dropdown/dropdown.component';
import { DropdownOptionComponent } from './shared/ui/dropdown-option/dropdown-option.component';
import { AccountListComponent } from './account-app/account-list/account-list.component';
import { NewAccountComponent } from './account-app/new-account/new-account.component';
import { Account, AccountStatus } from './account-app/state/account.model';
import { AccountService } from './account-app/state/account.service';
import { AccountItemComponent } from './account-app/account-list/account-item/account-item.component';

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
    HighlightDirective,
    UnlessDirective,
    DropdownComponent,
    DropdownOptionComponent,
    AccountListComponent,
    AccountItemComponent,
    NewAccountComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  // resources: Resource[] = [];
  // resourceType = ResourceType;
  // addedResources(resource: Resource) {
  //   this.resources.push(resource);
  // }
  // dropdownData = [
  //   { value: 'en', name: 'English' },
  //   { value: 'bg', name: 'Bulgarian' },
  //   { value: 'ua', name: 'Ukrainian' },
  //   { value: 'ro', name: 'Romanian' },
  // ];
  // dropdownSelected = this.dropdownData[1];
  // state = false;
  // PAGE_TITLE = PAGE_TITLE;
  loadedFeature = PAGE_TITLE.RECIPES;
  // selecteDropdown() {
  //   this.dropdownSelected = this.dropdownData[2];
  // }
  // addDropdownOption() {
  //   this.dropdownData.push({ value: 'fr', name: 'French' });
  // }

  accounts!: Account[];

  constructor(private accountService: AccountService) {}

  ngOnInit() {
    this.accounts = this.accountService.getAccounts();
  }

  onAddedAccount(account: Account) {
    this.accountService.addAccount(account);
  }

  onChangedStatus(account: Account, status: AccountStatus) {
    if (account?.id) {
      this.accountService.updateAccountStatus(account?.id, status);
    }
  }

  onNavigate(feature: PAGE_TITLE) {
    this.loadedFeature = feature;
  }
}

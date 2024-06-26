import { FormsModule } from '@angular/forms';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import {
  NgStyle,
  NgClass,
  UpperCasePipe,
  DatePipe,
  AsyncPipe,
} from '@angular/common';

import { HeaderComponent } from './features/header/header.component';
import { RecipesComponent } from './features/recipes/recipes.component';
import { ShoppingListComponent } from './features/shopping-list/shopping-list.component';

// import { Resource, ResourceType } from './resource-app/state/server.model';
import { CockpitComponent } from './resource-app/cockpit/cockpit.component';
import { ServerItemComponent } from './resource-app/server-item/server-item.component';
import { HighlightDirective } from './shared/directives/highlight.directive';
import { UnlessDirective } from './shared/directives/unless.directive';
import { SelectComponent } from './shared/ui/select/select.component';
import { SelectOptionComponent } from './shared/ui/select/select-option/select-option.component';
import { AccountListComponent } from './account-app/account-list/account-list.component';
import { NewAccountComponent } from './account-app/new-account/new-account.component';
import { Account, AccountStatus } from './account-app/state/account.model';
import { AccountService } from './account-app/state/account.service';
import { AccountItemComponent } from './account-app/account-list/account-item/account-item.component';
import { ActiveUsersComponent } from './users-app/active-users/active-users.component';
import { InactiveUsersComponent } from './users-app/inactive-users/inactive-users.component';
import { UsersService } from './users-app/state/users.service';
import { User } from './users-app/state/users.model';
import { Subscription, map } from 'rxjs';
import { HomeComponent } from './router-app/home/home.component';
import { UsersComponent } from './router-app/users/users.component';
import { ServersComponent } from './router-app/servers/servers.component';
import { RouterOutlet } from '@angular/router';
import { ShortenPipe } from './shared/pipes/shorten.pipe';
import { FilterPipe } from './shared/pipes/filter.pipe';
import { ReversePipe } from './shared/pipes/reverse.pipe';
import { SortPipe } from './shared/pipes/sort.pipe';
import { PostsComponent } from './posts-app/posts/posts.component';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoadingComponent } from './shared/ui/loading/loading.component';
import { LoadingQuery } from './shared/data-access/loading/loading.query';

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
    RecipesComponent,
    ShoppingListComponent,
    CockpitComponent,
    ServerItemComponent,
    HighlightDirective,
    UnlessDirective,
    SelectComponent,
    SelectOptionComponent,
    AccountListComponent,
    AccountItemComponent,
    NewAccountComponent,
    ActiveUsersComponent,
    InactiveUsersComponent,
    RouterOutlet,
    UpperCasePipe,
    DatePipe,
    ShortenPipe,
    FilterPipe,
    AsyncPipe,
    ReversePipe,
    SortPipe,
    PostsComponent,
    LoadingComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  protected readonly isLoading = inject(LoadingQuery).isLoading;

  // resources: Resource[] = [];
  // resourceType = ResourceType;
  // addedResources(resource: Resource) {
  //   this.resources.push(resource);
  // }
  // selectData = [
  //   { value: 'en', name: 'English' },
  //   { value: 'bg', name: 'Bulgarian' },
  //   { value: 'ua', name: 'Ukrainian' },
  //   { value: 'ro', name: 'Romanian' },
  // ];
  // selectSelected = this.selectData[1];
  // state = false;
  // select() {
  //   this.selectSelected = this.selectData[2];
  // }
  // addSelectOption() {
  //   this.selectData.push({ value: 'fr', name: 'French' });
  // }
  // accounts!: Account[];
  // activeUsers!: User[];
  // inactiveUsers!: User[];
  // usersSubscription!: Subscription;
  // constructor(
  //   private accountService: AccountService,
  //   private usersService: UsersService
  // ) {}
  // ngOnInit() {
  //   this.accounts = this.accountService.getAccounts();
  //   this.getUsers();
  //   this.usersSubscription = this.usersService.userStatusChanged.subscribe(() =>
  //     this.getUsers()
  //   );
  // }
  // ngOnDestroy() {
  //   this.usersSubscription?.unsubscribe();
  // }
  // onAddedAccount(account: Account) {
  //   this.accountService.addAccount(account);
  // }
  // onChangedStatus(account: Account, status: AccountStatus) {
  //   if (account?.id) {
  //     this.accountService.updateAccountStatus(account?.id, status);
  //   }
  // }
  // private getUsers() {
  //   this.activeUsers = this.usersService.getActiveUsers();
  //   this.inactiveUsers = this.usersService.getInactiveUsers();
  // }
}

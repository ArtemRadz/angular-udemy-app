import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-shopping-edit',
  standalone: true,
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShoppingEditComponent {}

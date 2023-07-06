import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shopping-edit',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShoppingEditComponent {}

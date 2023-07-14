import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [RouterLinkActive, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {}

import { FormsModule } from '@angular/forms';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [FormsModule, HeaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  name = 'Artem';
}

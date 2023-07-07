import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cockpit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CockpitComponent {
  @Output() addServer = new EventEmitter();

  serverName = '';
  serverContent = '';

  onAddServer() {
    this.addServer.emit({
      type: 'server',
      name: this.serverName,
      content: this.serverContent,
    });
  }

  onAddBlueprint() {
    this.addServer.emit({
      type: 'blueprint',
      name: this.serverName,
      content: this.serverContent,
    });
  }
}

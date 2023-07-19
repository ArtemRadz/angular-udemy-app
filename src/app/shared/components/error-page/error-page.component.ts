import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorPageComponent implements OnInit {
  errorMessage!: string;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.errorMessage = this.activatedRoute.snapshot.data['message'];
  }
}

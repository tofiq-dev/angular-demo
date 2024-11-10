import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'not-found',
  standalone: true,
  imports: [],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
})
export class NotFoundPage {
  private router = inject(Router);

  backToDashboard() {
    this.router.navigate(['users']);
  }
}

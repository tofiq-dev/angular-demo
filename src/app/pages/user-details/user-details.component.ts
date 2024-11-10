import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IUser } from '../../services/user/user.model';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'user-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss',
})
export class UserDetailsPage implements OnInit {
  private userService = inject(UserService);
  private activeRoute = inject(ActivatedRoute);

  userDetails$!: Observable<IUser>;

  ngOnInit(): void {
    const { id } = this.activeRoute.snapshot.params;
    this.userDetails$ = this.userService.getUserDetails(id);
  }
}

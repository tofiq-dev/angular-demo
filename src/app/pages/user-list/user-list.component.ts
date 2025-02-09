import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../../services/user/user.model';
import { UserService } from '../../services/user/user.service';
import { UserIcon } from '../../shared/icons/user.component';

@Component({
  selector: 'user-list',
  standalone: true,
  imports: [CommonModule, UserIcon],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListPage implements OnInit {
  private userService = inject(UserService);
  private router = inject(Router);

  users: IUser[] = [];
  status: 'LOADING' | 'COMPLETE' | 'ERROR' = 'LOADING';

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    return this.userService.getUsers().subscribe({
      next: (res) => {
        this.users = res;
        this.status = 'COMPLETE';
      },
      error: () => {
        this.status = 'ERROR';
      },
    });
  }

  openUserDetails(id: number) {
    this.router.navigate(['users', id]);
  }
}

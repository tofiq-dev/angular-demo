import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../../services/user/user.model';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListPage implements OnInit {
  private userService = inject(UserService);

  users$!: Observable<IUser[]>;

  ngOnInit(): void {
    this.users$ = this.getUsers();
  }

  getUsers() {
    return this.userService.getUsers();
  }
}

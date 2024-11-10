import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from '../../services/user/user.model';
import { UserService } from '../../services/user/user.service';
import { BuildingIcon } from '../../shared/icons/building.component';
import { GlobeIcon } from '../../shared/icons/globe.component';
import { LocationIcon } from '../../shared/icons/location.component';
import { MailIcon } from '../../shared/icons/mail.component';
import { PhoneIcon } from '../../shared/icons/phone.component';

@Component({
  selector: 'user-details',
  standalone: true,
  imports: [CommonModule, MailIcon, PhoneIcon, GlobeIcon, LocationIcon, BuildingIcon],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss',
})
export class UserDetailsPage implements OnInit {
  private userService = inject(UserService);
  private activeRoute = inject(ActivatedRoute);
  private router = inject(Router);

  userDetails!: IUser;
  status: 'LOADING' | 'COMPLETE' | 'ERROR' = 'LOADING';

  ngOnInit(): void {
    const { id } = this.activeRoute.snapshot.params;
    this.getUserDetails(id);
  }

  getUserDetails(id: number) {
    this.userService.getUserDetails(id).subscribe({
      next: (res) => {
        this.userDetails = res;
        this.status = 'COMPLETE';
      },
      error: () => {
        this.router.navigate(['not-found']);
        this.status = 'ERROR';
      },
    });
  }

  backToDashboard() {
    this.router.navigate(['users']);
  }
}

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { MOCK_USERS } from '../../services/mock-data/user';
import { UserService } from '../../services/user/user.service';
import { UserDetailsPage } from './user-details.component';

describe('User details page', () => {
  let component: UserDetailsPage;
  let fixture: ComponentFixture<UserDetailsPage>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let routerSpy: jasmine.SpyObj<Router>;

  const MOCK_USER = MOCK_USERS[0];

  beforeEach(async () => {
    userServiceSpy = jasmine.createSpyObj('UserService', ['getUserDetails']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const activatedRouteSpy = { snapshot: { params: { id: MOCK_USER.id } } } as any;

    await TestBed.configureTestingModule({
      imports: [UserDetailsPage],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserDetailsPage);
    component = fixture.componentInstance;
  });

  it('should display loading skeletons when status is LOADING', () => {
    userServiceSpy.getUserDetails.and.returnValue(of());
    component.status = 'LOADING';
    fixture.detectChanges();

    const loadingSkeleton = fixture.nativeElement.querySelector('.animate-pulse');
    expect(loadingSkeleton).toBeTruthy();
  });

  it('should set user and status to COMPLETE on successful getUsersDetails', () => {
    userServiceSpy.getUserDetails.and.returnValue(of(MOCK_USER));
    fixture.detectChanges();

    expect(component.status).toEqual('COMPLETE');
    expect(component.userDetails).toEqual(MOCK_USER);
  });

  it('should render user details on successful getUsersDetails', () => {
    userServiceSpy.getUserDetails.and.returnValue(of(MOCK_USER));
    fixture.detectChanges();

    const userName = fixture.nativeElement.querySelector('h1');
    expect(userName.textContent).toContain(MOCK_USER.name);
  });

  it('should navigate to not-found page on failed getUsersDetails', () => {
    userServiceSpy.getUserDetails.and.returnValue(throwError(() => new Error('API error')));
    fixture.detectChanges();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['not-found']);
    expect(component.status).toBe('ERROR');
  });

  it('should navigate to dashboard when back button cliked', () => {
    userServiceSpy.getUserDetails.and.returnValue(of(MOCK_USER));
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    compiled.querySelector('button')?.click();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['users']);
  });
});

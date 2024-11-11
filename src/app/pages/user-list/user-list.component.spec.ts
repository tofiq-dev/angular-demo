import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { MOCK_USERS } from '../../services/mock-data/user';
import { UserService } from '../../services/user/user.service';
import { UserListPage } from './user-list.component';

describe('User list page', () => {
  let component: UserListPage;
  let fixture: ComponentFixture<UserListPage>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    userServiceSpy = jasmine.createSpyObj('UserService', ['getUsers']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [UserListPage],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserListPage);
    component = fixture.componentInstance;
  });

  it('should set users and status to COMPLETE on successful getUsers', () => {
    userServiceSpy.getUsers.and.returnValue(of(MOCK_USERS));
    fixture.detectChanges();

    expect(component.users).toEqual(MOCK_USERS);
    expect(component.status).toBe('COMPLETE');
    fixture.detectChanges();
  });

  it('should render user list on successfull getUsers and users are available', () => {
    userServiceSpy.getUsers.and.returnValue(of(MOCK_USERS));
    fixture.detectChanges();

    const userRows = fixture.nativeElement.querySelectorAll('tbody tr');

    expect(userRows.length).toBe(MOCK_USERS.length);
    expect(userRows[0].textContent).toContain(MOCK_USERS[0].name);
  });

  it('should set status to ERROR on failed getUsers', () => {
    userServiceSpy.getUsers.and.returnValue(throwError(() => new Error('API error')));
    fixture.detectChanges();

    expect(component.users).toEqual([]);
    expect(component.status).toBe('ERROR');
  });

  it('should display error message on failed getUsers', () => {
    userServiceSpy.getUsers.and.returnValue(throwError(() => new Error('API error')));
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('tbody tr td p')?.textContent).toEqual('No user found');
  });

  it('should display loading skeletons when status is LOADING', () => {
    userServiceSpy.getUsers.and.returnValue(of([]));
    component.status = 'LOADING';
    fixture.detectChanges();

    const loadingSkeletons = fixture.nativeElement.querySelector('.animate-pulse');
    expect(loadingSkeletons).toBeTruthy();
  });

  it('should navigate to user details page when openUserDetails is called', () => {
    userServiceSpy.getUsers.and.returnValue(of(MOCK_USERS));
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const detailsButton = compiled.querySelector('button');

    spyOn(component, 'openUserDetails').and.callThrough();

    detailsButton?.click();

    expect(component.openUserDetails).toHaveBeenCalledWith(MOCK_USERS[0].id);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['users', MOCK_USERS[0].id]);
  });
});

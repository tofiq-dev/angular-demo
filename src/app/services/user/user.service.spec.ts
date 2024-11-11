import { TestBed } from '@angular/core/testing';

import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { MOCK_USERS } from '../mock-data/user';
import { UserService } from './user.service';

describe('User service', () => {
  let service: UserService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useValue: httpClientSpy }],
    });
    service = TestBed.inject(UserService);
  });

  it('should return user list when getUsers called', (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(of(MOCK_USERS));

    service.getUsers().subscribe({
      next: (res) => {
        expect(httpClientSpy.get).toHaveBeenCalledWith(
          'https://jsonplaceholder.typicode.com/users',
        );
        expect(res).toEqual(MOCK_USERS);
        done();
      },
    });
  });

  it('should return user details when getUserDetails called', (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(of(MOCK_USERS[0]));

    service.getUserDetails(1).subscribe({
      next: (res) => {
        expect(httpClientSpy.get).toHaveBeenCalledWith(
          'https://jsonplaceholder.typicode.com/users/1',
        );
        expect(res).toEqual(MOCK_USERS[0]);
        done();
      },
    });
  });
});

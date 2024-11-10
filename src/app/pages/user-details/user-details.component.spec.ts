import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailsPage } from './user-details.component';

describe('UserDetailsComponent', () => {
  let component: UserDetailsPage;
  let fixture: ComponentFixture<UserDetailsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDetailsPage],
    }).compileComponents();

    fixture = TestBed.createComponent(UserDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

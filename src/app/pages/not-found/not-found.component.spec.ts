import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { NotFoundPage } from './not-found.component';

describe('Not found page', () => {
  let component: NotFoundPage;
  let fixture: ComponentFixture<NotFoundPage>;
  let routerSpy: jasmine.SpyObj<Router>;
  let location: Location;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [NotFoundPage],
      providers: [{ provide: Router, useValue: routerSpy }, Location],
    }).compileComponents();

    fixture = TestBed.createComponent(NotFoundPage);
    component = fixture.componentInstance;
    location = TestBed.inject(Location);

    fixture.detectChanges();
  });

  it('should show not found message', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toEqual('404');
    expect(compiled.querySelector('p')?.textContent).toEqual('Page Not Found');
  });

  it('should navigate to dashboard when back button cliked', () => {
    routerSpy.navigate.and.callFake(() => {
      location.go('/users');
      return Promise.resolve(true);
    });

    component.backToDashboard();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['users']);
    expect(location.path()).toBe('/users');
  });
});

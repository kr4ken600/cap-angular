import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UtilService } from './services/util.service';
import { Subject } from 'rxjs';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  template: '<span>Login</span>'
})
class MockLoginComponent {}


describe('AppComponent', () => {
  let routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);
  let utilSvcSpy = jasmine.createSpyObj<UtilService>('UtilService', [
    'getToken',
    'deleteToken',
    'isLogged',
  ]);

  utilSvcSpy.isLogged = new Subject<boolean>();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: 'login',
            component: MockLoginComponent,
          },
        ]),
        MatToolbarModule,
      ],
      declarations: [AppComponent],
      providers: [{ provide: UtilService, useValue: utilSvcSpy }],
    }).compileComponents();
    // router = TestBed.inject(Router);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'curso'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('curso');
  });

  it(`should create app with user logged in'`, () => {
    utilSvcSpy.getToken.and.returnValue('token');
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.isLogged).toBe(true);
  });

  it(`should create app with user is not logged'`, () => {
    utilSvcSpy.getToken.and.returnValue(null);
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.isLogged).toBe(false);
  });

  it(`should recieve isLogged from utilsSvc - true'`, () => {
    // utilSvcSpy.getToken.and.returnValue('token');
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    utilSvcSpy.isLogged.next(true);
    expect(app.isLogged).toBe(true);
  });

  it(`should recieve isLogged from utilsSvc - false'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    utilSvcSpy.isLogged.next(false);
    expect(app.isLogged).toBe(false);
  });

  it(`should logout'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.logout();
    expect(utilSvcSpy.deleteToken).toHaveBeenCalled();
    // expect(router.url).toContain('login');
  });
});

import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { UtilService } from './util.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthService', () => {
  let service: AuthService;

  let utilSvcSpy = jasmine.createSpyObj<UtilService>('UtilService', ['getToken']);
  let routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{
        path: 'login',
        redirectTo: ''
      }])],
      providers: [
        { provide: Router, useValue: routerSpy},
        { provide: UtilService, useValue: utilSvcSpy},
      ]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should canActivate user logged in', () => {
    utilSvcSpy.getToken.and.returnValue('token');
    const res = service.canActivate();
    expect(res).toBeTrue();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should canActivate user is not logged', () => {
    utilSvcSpy.getToken.and.returnValue(null);
    const res = service.canActivate();
    expect(res).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['login']);
  });
});

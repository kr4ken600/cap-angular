import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UtilService } from './util.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthService', () => {
  let service: AuthService;

  let utilSvcSpy = jasmine.createSpyObj<UtilService>('UtilService', [
    'getToken',
  ]);

  let routerSvcSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    routerSvcSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'login', redirectTo: '' }]),
        HttpClientTestingModule,
      ],
      providers: [
        { provide: UtilService, useValue: utilSvcSpy },
        { provide: Router, useValue: routerSvcSpy },
      ],
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should can activate user logged in', () => {
    utilSvcSpy.getToken.and.returnValue('token');
    const res = service.canActivate();
    expect(res).toBeTrue();
    expect(routerSvcSpy.navigate).not.toHaveBeenCalled();
  });

  it('should can`t activate user logged in', () => {
    utilSvcSpy.getToken.and.returnValue(null);
    const res = service.canActivate();
    expect(res).toBeFalse();
    expect(routerSvcSpy.navigate).toHaveBeenCalledWith(['login']);
  });
});
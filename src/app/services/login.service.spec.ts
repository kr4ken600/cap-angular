import { TestBed, inject } from '@angular/core/testing';

import { LoginService } from './login.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Observable } from 'rxjs';

describe('LoginService', () => {
  let service: LoginService;
  let httpCtrl: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(LoginService);
    httpCtrl = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be created', inject([HttpTestingController],(httpMock:HttpTestingController) => {
    const req = {
      email: 'correo@ejem.com',
      password: "132"
    };
    const obs = service.login(req);
    expect(obs instanceof Observable).toBeTrue();
    obs.subscribe({
      next: (res) => {
        expect(res).toBeDefined();
      }
    });
    const request = httpMock.expectOne('https://reqres.in/api/login');
    expect(request.request.body).toEqual(req);
    expect(request.request.method).toBe('POST');
    const resToken = {
      token: 'token'
    };
    request.flush(resToken);
  }));
});
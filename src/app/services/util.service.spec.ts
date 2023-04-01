import { TestBed } from '@angular/core/testing';

import { UtilService } from './util.service';

describe('UtilService', () => {
  let service: UtilService;

  beforeEach(() => {
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem');
    spyOn(localStorage, 'removeItem');
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save token in localStorage', (done: DoneFn) => {
    service.isLogged.subscribe({
      next: (val) => {
        expect(val).toBe(true);
        done();
      }
    });
    service.saveToken('token1234');
    expect(localStorage.setItem).toHaveBeenCalledWith('TOKEN', 'token1234');
  });

  it('should get token in localStorage', () => {
    service.getToken();
    expect(localStorage.getItem).toHaveBeenCalledWith('TOKEN');
  });

  it('should delete token in localStorage', () => {
    service.isLogged.subscribe({
      next: (val) => {
        expect(val).toBe(false)
      }
    })
    service.deleteToken();
    expect(localStorage.removeItem).toHaveBeenCalledWith('TOKEN');
  });
});

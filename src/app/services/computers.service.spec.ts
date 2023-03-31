import { TestBed, inject } from '@angular/core/testing';

import { ComputersService } from './computers.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Observable } from 'rxjs';

describe('ComputersService', () => {
  let service: ComputersService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(ComputersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should http get computers', inject([HttpTestingController], (httpMock: HttpTestingController) => {
    const obs = service.getComputers();

    expect(obs instanceof Observable).toBeTrue();

    obs.subscribe({next: (val) => {
      expect(val).toBeDefined();
      expect(val.length).toBe(1);
      const firsElement = val[0];
      expect(firsElement.id).toBe(1);
      expect(firsElement.brand).toBe('HP');
      expect(firsElement.model).toBe('Pavilon');
    }});

    const request = httpMock.expectOne('http://localhost:3000/computers');
    expect(request.request.method).toBe('GET');

    request.flush([{
      id: 1,
      brand: 'HP',
      model: 'Pavilon'
    }]);
  }));

  it('should http get computers - error', inject([HttpTestingController], (httpMock: HttpTestingController) => {
    const obs = service.getComputers();

    expect(obs instanceof Observable).toBeTrue();

    obs.subscribe({error: (err) => {
      expect(err.error.type).toBe('computers not found');
    }});

    const request = httpMock.expectOne('http://localhost:3000/computers');
    expect(request.request.method).toBe('GET');

    request.error(new ErrorEvent('computers not found'))
  }));

  it('should http get computer', inject([HttpTestingController], (httpMock: HttpTestingController) => {
    const obs = service.getComputer(1);

    expect(obs instanceof Observable).toBeTrue();

    // obs.subscribe({next: (val) => {
    //   expect(val).toBeDefined();
    //   expect(val.id).toBe(1);
    //   expect(val.brand).toBe('HP');
    //   expect(val.model).toBe('Pavilon');
    // }});

    const request = httpMock.expectOne('http://localhost:3000/computers/1');
    expect(request.request.method).toBe('GET');

    request.flush([{
      id: 1,
      brand: 'HP',
      model: 'Pavilon'
    }]);
  }));
});
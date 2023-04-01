import { TestBed, inject } from '@angular/core/testing';

import { ComputersService } from './computers.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Observable } from 'rxjs';
import { IComputer } from '../model/computer.mode';

describe('ComputersService', () => {
  let service: ComputersService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(ComputersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // GET COMPUTERS
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

  // GET ONE COMPUTER
  it('should http get one computer', inject([HttpTestingController], (httpMock: HttpTestingController) => {
    const id = 1;
    const obs = service.getComputer(id);

    expect(obs instanceof Observable).toBeTrue();

    obs.subscribe({next: (val) => {
      expect(val).toBeDefined();
      expect(val.id).toBe(1);
      expect(val.brand).toBe('HP');
      expect(val.model).toBe('Pavilon');
    }});

    const request = httpMock.expectOne('http://localhost:3000/computers/1');
    expect(request.request.method).toBe('GET');

    request.flush({
      id: 1,
      brand: 'HP',
      model: 'Pavilon'
    });
  }));

  it('should http get computer - error', inject([HttpTestingController], (httpMock: HttpTestingController) => {
    const id = 1;
    const obs = service.getComputer(id);

    expect(obs instanceof Observable).toBeTrue();

    obs.subscribe({error: (err) => {
      expect(err.error.type).toBe('computers not found');
    }});

    const request = httpMock.expectOne('http://localhost:3000/computers/1');
    expect(request.request.method).toBe('GET');

    request.error(new ErrorEvent('computers not found'))
  }));

  // POST COMPUTER
  it('should http post computer', inject([HttpTestingController], (httpMock: HttpTestingController) => {

    const data = {
      id: 1,
      brand: 'HP',
      model: 'HPMJK1'
    } as IComputer;

    const obs = service.setComputers(data);

    expect(obs instanceof Observable).toBeTrue();

    obs.subscribe({next: (val) => {
      expect(val).toBeDefined();
    }});

    const request = httpMock.expectOne('http://localhost:3000/computers');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(data);

    request.flush({});
  }));
  
  it('should http post computers - error', inject([HttpTestingController], (httpMock: HttpTestingController) => {

    const data = {
      id: 1,
      brand: 'HP',
      model: 'HPMJK1'
    } as IComputer;

    const obs = service.setComputers(data);

    expect(obs instanceof Observable).toBeTrue();

    obs.subscribe({error: (err) => {
      expect(err.error.type).toBe('error save computer');
    }});

    const request = httpMock.expectOne('http://localhost:3000/computers');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(data);

    request.error(new ErrorEvent('error save computer'));
  }));

  //DELETE COMPUTERS
  it('should http delet computers', inject([HttpTestingController], (httpMock: HttpTestingController) => {

    const idComputer = 1;

    const obs = service.deleteComputer(idComputer);

    expect(obs instanceof Observable).toBeTrue();

    obs.subscribe({next: (val) => {
      expect(val).toBeDefined();
    }});

    const request = httpMock.expectOne('http://localhost:3000/computers/1');
    expect(request.request.method).toBe('DELETE');

    request.flush({});
  }));

  it('should http delet computer - error', inject([HttpTestingController], (httpMock: HttpTestingController) => {

    const idComputer = 1;

    const obs = service.deleteComputer(idComputer);

    expect(obs instanceof Observable).toBeTrue();

    obs.subscribe({error: (err) => {
      expect(err.error.type).toBe('error delete computer');
    }});

    const request = httpMock.expectOne('http://localhost:3000/computers/1');
    expect(request.request.method).toBe('DELETE');

    request.error(new ErrorEvent('error delete computer'));
  }));

  // PATCH COMPUTER
  it('should http patch computer', inject([HttpTestingController], (httpMock: HttpTestingController) => {
    const data = {
      id: 1,
      brand: 'HP',
      model: 'HPART3'
    } as IComputer;
    const obs = service.editComputer(data.id, data);

    expect(obs instanceof Observable).toBeTrue();

    obs.subscribe({next: (val) => {
      expect(val).toBeDefined();
    }});

    const request = httpMock.expectOne('http://localhost:3000/computers/1');
    expect(request.request.method).toBe('PATCH');
    expect(request.request.body).toEqual(data);

    request.flush({});
  }));
  
  it('should http patch computer - error', inject([HttpTestingController], (httpMock: HttpTestingController) => {
    const data = {
      id: 1,
      brand: 'HP',
      model: 'HPART3'
    } as IComputer;
    const obs = service.editComputer(data.id, data);

    expect(obs instanceof Observable).toBeTrue();

    obs.subscribe({error: (err) => {
      expect(err.error.type).toBe('error edit computer');
    }});

    const request = httpMock.expectOne('http://localhost:3000/computers/1');
    expect(request.request.method).toBe('PATCH');
    expect(request.request.body).toEqual(data);

    request.error(new ErrorEvent('error edit computer'));
  }));
});
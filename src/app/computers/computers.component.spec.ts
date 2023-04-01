import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputersComponent } from './computers.component';
import { MatTableModule } from '@angular/material/table';
import { ComputersService } from '../services/computers.service';
import { of, throwError } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterTestingModule } from '@angular/router/testing';
import { IComputer } from '../model/computer.mode';

describe('ComputersComponent', () => {
  let component: ComputersComponent;
  let fixture: ComponentFixture<ComputersComponent>;

  let computerSvcSpy = jasmine.createSpyObj<ComputersService>(
    'ComputersService',
    ['deleteComputer', 'getComputers']
  );

  computerSvcSpy.getComputers.and.returnValue(of([]));
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComputersComponent],
      imports: [
        MatTableModule,
        MatIconModule,
        MatButtonModule,
        RouterTestingModule,
      ],
      providers: [
        { provide: ComputersService, useValue: computerSvcSpy }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ComputersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //LoadData
  it('should loadDarta', () => {
    spyOn(window, 'alert');
    computerSvcSpy.getComputers.and.returnValue(
      throwError(() => 'computer not found')
    );
    component.loadData();
    expect(window.alert).toHaveBeenCalledWith(
      'Algo salio mal, vuelva a intentarlo.'
    );
  });

  it('should loadDarta - error', () => {
    spyOn(window, 'alert');
    computerSvcSpy.getComputers.and.returnValue(
      throwError(() => 'computer not found')
    );
    component.loadData();
    expect(window.alert).toHaveBeenCalledWith(
      'Algo salio mal, vuelva a intentarlo.'
    );
  });

  // Button delete Computer
  it('should deleteComputer', () => {
    const item = {
      id: 1,
      brand: 'HP',
      model: 'Pavilon',
    } as IComputer;

    computerSvcSpy.deleteComputer.and.returnValue(of([]));

    component.deleteComputer(item);

    expect(computerSvcSpy.deleteComputer).toHaveBeenCalledWith(1);
  });

  it('should deleteComputer - error', () => {
    spyOn(window, 'alert');

    computerSvcSpy.deleteComputer.and.returnValue(
      throwError(() => 'computer not found')
    );

    const item = {
      id: 1,
      brand: 'HP',
      model: 'Pavilon',
    } as IComputer;

    component.deleteComputer(item);

    expect(window.alert).toHaveBeenCalledWith('Algo salio mal.');
  });
});

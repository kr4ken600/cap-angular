import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewComputerComponent } from './new-computer.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { ComputersService } from 'src/app/services/computers.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { IComputer } from 'src/app/model/computer.mode';
import { of, throwError } from 'rxjs';

describe('NewComputersComponent', () => {
  let component: NewComputerComponent;
  let fixture: ComponentFixture<NewComputerComponent>;

  let computerSvcSpy = jasmine.createSpyObj<ComputersService>('ComputersService', ['setComputers']);
  let routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate'])

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewComputerComponent],
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: 'computers',
            redirectTo: ''
          }
        ]),
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
      ],
      providers: [{ provide: ComputersService, useValue: computerSvcSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(NewComputerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should addComputer', () => {
    const mockRequest = {
      brand: 'HP',
      model: 'Pavilon',
    } as IComputer;
    
    computerSvcSpy.setComputers.and.returnValue(of(mockRequest));
    component.formComputer?.patchValue(mockRequest);
    component.addComputer();
    expect(computerSvcSpy.setComputers).toHaveBeenCalledWith(mockRequest)
    // expect(routerSpy.navigate).toHaveBeenCalledWith(['computers']);
  });

  it('should addComputer - error', () => {
    spyOn(window, 'alert');

    const mockRequest = {
      brand: 'HP',
      model: 'Pavilon',
    } as IComputer;
    
    computerSvcSpy.setComputers.and.returnValue(throwError(() => 'computer not found'));
    
    component.formComputer?.patchValue(mockRequest);
    component.addComputer();
    
    expect(window.alert).toHaveBeenCalledWith('Algo salio mal.');
  });
});
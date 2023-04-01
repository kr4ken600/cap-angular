import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditComputerComponent } from './edit-computer.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComputersService } from 'src/app/services/computers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NEVER, delay, of, throwError } from 'rxjs';
import { IComputer } from 'src/app/model/computer.mode';

describe('EditComputerComponent', () => {
  let component: EditComputerComponent;
  let fixture: ComponentFixture<EditComputerComponent>;

  let computerSvcSpy = jasmine.createSpyObj<ComputersService>(
    'ComputersService',
    ['getComputer', 'editComputer']
  );

  let activeRouteSpy: ActivatedRoute;

  let routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);

  // activeRouteSpy.params = NEVER;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditComputerComponent],
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: 'computers',
            redirectTo: '',
          },
        ]),
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: ComputersService, useValue: computerSvcSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({
              id: 1,
            }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditComputerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    activeRouteSpy = TestBed.inject(ActivatedRoute);
  });

  it('should create', () => {
    console.log(activeRouteSpy.params);

    activeRouteSpy.params.subscribe({
      next: (value) => {
        expect(component.computerID).toEqual(value['id']);
      },
    });
    expect(component).toBeTruthy();
  });

  // Load Data
  it('should loadData', () => {
    const mockResponse: IComputer = { id: 1, brand: 'HP', model: 'HPYK1' };
    
    computerSvcSpy.getComputer.and.returnValue(of(mockResponse));
    component.loadData();

    expect(computerSvcSpy.getComputer).toHaveBeenCalledWith(1);
  });

  it('should loadData - error', () => {
    spyOn(window, 'alert');
    computerSvcSpy.getComputer.and.returnValue(
      throwError(() => 'computer not found')
    );
    component.loadData();

    expect(computerSvcSpy.getComputer).toHaveBeenCalledWith(1);
    expect(window.alert).toHaveBeenCalledWith('Algo salio mal.');
  });

  //Edit Computer
  it('should editComputer', () => {
    const mockRequest = { brand: 'HP', model: 'HPYK1' } as IComputer;

    computerSvcSpy.editComputer.and.callFake((fn: 1, mockRequest) => {
      return of([]).pipe(delay(100));
    });
    component.formComputer?.patchValue(mockRequest);
    component.editComputer();

    expect(computerSvcSpy.editComputer).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['computers']);
  });

  it('should editComputer - error', () => {
    spyOn(window, 'alert');
    const mockRequest = { brand: 'HP', model: 'HPYK1' } as IComputer;

    computerSvcSpy.editComputer.and.returnValue(
      throwError(() => 'computer not found')
    );

    component.formComputer?.patchValue(mockRequest);
    component.editComputer();

    expect(window.alert).toHaveBeenCalledWith('Algo salio mal.');
  });
});

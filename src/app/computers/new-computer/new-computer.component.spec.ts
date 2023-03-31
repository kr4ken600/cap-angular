import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewComputerComponent } from './new-computer.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { ComputersService } from 'src/app/services/computers.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('NewComputersComponent', () => {
  let component: NewComputerComponent;
  let fixture: ComponentFixture<NewComputerComponent>;

  let computerSvcSpy = jasmine.createSpyObj<ComputersService>('ComputersService', ['setComputers']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewComputerComponent],
      imports: [
        RouterTestingModule,
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
});
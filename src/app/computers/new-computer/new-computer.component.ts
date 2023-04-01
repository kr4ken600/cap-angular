import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IComputer } from 'src/app/model/computer.mode';
import { ComputersService } from 'src/app/services/computers.service';

@Component({
  selector: 'app-new-computer',
  templateUrl: './new-computer.component.html',
  styleUrls: ['./new-computer.component.css'],
})
export class NewComputerComponent {
  formComputer?: FormGroup;

  constructor(
    private fb: FormBuilder,
    private compSvc: ComputersService,
    private router: Router
  ) {
    this.formComputer = this.fb.group({
      brand: ['', Validators.required],
      model: ['', Validators.required],
    });
  }

  addComputer() {
    const req = this.formComputer?.value as IComputer;
    this.compSvc.setComputers(req).subscribe({
      next: () => {
        this.router.navigate(['/computers']);
      },
      error: (err) => {
        alert('Algo salio mal.');
      },
    });
  }
}

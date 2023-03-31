import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IComputer } from 'src/app/model/computer.mode';
import { ComputersService } from 'src/app/services/computers.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-computer',
  templateUrl: './edit-computer.component.html',
  styleUrls: ['./edit-computer.component.css'],
})
export class EditComputerComponent {
  computerID: number = 0;
  formComputer?: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private compSvc: ComputersService,
    private router: Router
  ) {
    this.route.params.subscribe({
      next: (value) => {
        this.computerID = value['id'];
        this.loadData();
      },
    });
  }

  //Consumir servicio
  //GET http://localhost:3000/ID
  loadData() {
    this.compSvc.getComputer(this.computerID).subscribe({
      next: (computer) => {
        this.formComputer = this.fb.group({
          brand: [computer.brand, Validators.required],
          model: [computer.model, Validators.required],
        });
      },
      error: (err) => {
        alert('Algo salio mal.');
      },
    });
  }

  //Actualizar objeto
  //PATCH http://localhost:3000/ID 
  editComputer(){
    const body = this.formComputer?.value as IComputer;
    this.compSvc.editComputer(this.computerID, body).subscribe({
      next: () => {
        this.router.navigate(['/computers']);
      },
      error: () => {
        alert('Algo salio mal.');
      }
    });
  }
}

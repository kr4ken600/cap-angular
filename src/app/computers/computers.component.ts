import { Component } from '@angular/core';
import { ComputersService } from '../services/computers.service';
import { MatTableDataSource } from "@angular/material/table";
import { IComputer } from '../model/computer.mode';

@Component({
  selector: 'app-computers',
  templateUrl: './computers.component.html',
  styleUrls: ['./computers.component.css'],
})
export class ComputersComponent {
  computers = new MatTableDataSource<IComputer>();
  displayedColumns = ["id", "brand", "model", "actions"]

  constructor(private computerSvc: ComputersService) {
    this.loadData();
  }

  loadData(){
    this.computerSvc.getComputers().subscribe({
      next: (list) => {
        this.computers.data = list;
      },
      error: (err) => {
        alert('Algo salio mal, vuelva a intentarlo.')
      },
    });
  }

  deleteComputer(item: IComputer){
    this.computerSvc.deleteComputer(item.id).subscribe({
      next: () => {
        this.loadData();
      },
      error: (err) => {
        alert("Algo salio mal.");
      }
    })
  }
}

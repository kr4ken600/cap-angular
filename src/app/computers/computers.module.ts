import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComputersRoutingModule } from './computers-routing.module';
import { ComputersComponent } from './computers.component';
import { MatTableModule } from '@angular/material/table';
import { NewComputerComponent } from './new-computer/new-computer.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { EditComputerComponent } from './edit-computer/edit-computer.component';

@NgModule({
  declarations: [ComputersComponent, NewComputerComponent, EditComputerComponent],
  imports: [
    CommonModule,
    ComputersRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule
  ],
})
export class ComputersModule {}

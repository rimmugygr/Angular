import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../../shared/shared/shared.module';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import {CommonModule} from '@angular/common';
import { EmployeeDetailModalComponent } from './employee-detail-modal/employee-detail-modal.component';
import {MatDialogModule} from '@angular/material/dialog';
import { EmployeeAddModalComponent } from './employee-add-modal/employee-add-modal.component';



@NgModule({
  declarations: [EmployeeListComponent, EmployeeDetailModalComponent, EmployeeAddModalComponent],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: EmployeeListComponent
      }
    ]),
    CommonModule,
    MatDialogModule
  ]
})
export class EmployeeModule { }

import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../../shared/shared/shared.module';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import {CommonModule} from '@angular/common';



@NgModule({
  declarations: [EmployeeListComponent],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: EmployeeListComponent
      },
      // {
      //   path: ':alternate',
      //   component: ProductShellComponent
      // }
    ]),
    CommonModule
  ]
})
export class EmployeeModule { }

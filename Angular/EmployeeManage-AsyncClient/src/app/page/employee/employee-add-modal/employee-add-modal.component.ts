import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Employee} from '../model/employee';
import {EmployeeService} from '../services/employee.service';

@Component({
  selector: 'app-employee-add-modal',
  templateUrl: './employee-add-modal.component.html',
  styleUrls: ['./employee-add-modal.component.css']
})
export class EmployeeAddModalComponent implements OnInit {

  employee: Employee = {
    city: 'Poznan',
    departmentId: 4,
    description: 'Good worker',
    email: 'none@none.pl',
    firstName: 'first',
    id: 11,
    lastName: 'last',
    street: 'Center 2'
  };

  constructor(
    public dialogRef: MatDialogRef<EmployeeAddModalComponent>,
    private employeeService: EmployeeService) { }

  ngOnInit(): void {
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  onAddClick(employee: Employee): void {
    this.employeeService.addEmployee(employee);
    this.dialogRef.close();
  }
}

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {HomeComponent} from './page/home/home.component';
import {NotFoundComponent} from './page/not-found/not-found.component';


@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: 'welcome', component: HomeComponent },
      {
        path: 'employee',
        loadChildren: () =>
          import('./page/employee/employee.module').then(m => m.EmployeeModule)
      },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: '**', component: NotFoundComponent }
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

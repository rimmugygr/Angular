import {Component, OnInit} from '@angular/core';
import {from, of} from 'rxjs';
import {map, take, tap} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  title = 'EmployeeManage-AsyncClient';
  pageTitle: `Employee Manage`;

  ngOnInit(): void {
    // simple test
    of(2, 4, 5).subscribe(console.log);
    console.log(`####`);
    from([11, 22, 33, 44]).subscribe(
      data => console.log(`item : ${data}`),
      err => console.error(`error ${err}`),
      () => console.log(`completed`)
    );
    console.log(`####`);
    of(...[11, 22, 33, 44]).pipe(
      map(x => x * 2),
      tap(x => console.log(x)),
      take(3)
    ).subscribe(
      data => console.log(`item : ${data}`),
      err => console.log(`error ${err}`),
      () => console.log(`completed`)
    );
    console.log(`####`);
    of(...[11, 22, 33, 44]).pipe(
      map(x => x * 2),
      tap(x => console.log(x)),
      map(x => {
        if (x === 44) { throw new Error(`44 Detected`); }
        return x;
      })
    ).subscribe(
      data => console.log(`item : ${data}`),
      err => console.log(`error ${err}`),
      () => console.log(`completed`)
    );
  }
}

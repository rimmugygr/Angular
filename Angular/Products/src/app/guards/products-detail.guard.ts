import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsDetailGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(
    // provide current route information
    next: ActivatedRouteSnapshot,
    // provide router state information
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const id = +next.url[1].path;
    if (isNaN(id) || id < 1){
      alert('Invalid product id');
      this.router.navigate(['/products']);
      return false;
    };
    return true;
  }

}

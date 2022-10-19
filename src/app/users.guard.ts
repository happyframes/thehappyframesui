import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersGuard implements CanActivate {
	constructor(private readonly router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (localStorage.getItem('userData')) {
      let userdata = JSON.parse(localStorage.getItem('userData') || '{}');
      return true;
    } else {
    	this.router.navigate(['/']);
      return false;
    }
  }
  
}

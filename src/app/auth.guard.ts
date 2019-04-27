import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if (localStorage.getItem('token')) {
      return true;
    }

    // this.router.navigate(['/login'], { queryParams: {redirect: state.url} });
    // 使用 parseUrl 的方式回傳一個 UrlTree
    return this.router.parseUrl(`/login?redirect=${encodeURI(state.url)}`);
  }
}

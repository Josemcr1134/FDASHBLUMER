import { Injectable } from '@angular/core';
import { GlobalsService  } from "../Globals/globals.service";
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GuardsService implements CanActivate {

  constructor(private globals : GlobalsService,private route: Router) {

  }
  canActivate(
    _next: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const auth = this.globals.getToken() !== '';
    if(!auth){
      this.route.navigate(['']);
    }
    return auth;
  }
}

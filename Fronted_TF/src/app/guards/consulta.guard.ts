import { ActivatedRouteSnapshot, GuardResult, MaybeAsync, RouterStateSnapshot } from "@angular/router";
import { UserService } from "../services/user.service";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ConsultaGuard {


  constructor (private userService: UserService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
              MaybeAsync<GuardResult> 
//            boolean | UrlTree | RedirectCommand | Observable<boolean | UrlTree | RedirectCommand> | Promise<boolean | UrlTree | RedirectCommand>
  {
      let permisos = this.userService.getAuthoritiesActual();
      if (permisos) {
        if (permisos.indexOf("CONSULTA")>=0) {
          return true;
        }
      }
      return false;
  }

  
}

/*

  Funcion -> FP -> CanActivateFn 
  Class -> POO -> CanActivate


import { CanActivateFn } from '@angular/router';

export const consultaGuard: CanActivateFn = (route, state) => {
  return true;
};

*/
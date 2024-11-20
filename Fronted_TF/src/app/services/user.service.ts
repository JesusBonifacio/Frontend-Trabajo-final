import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Token } from '../models/token';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  ruta_servidor: string = "http://localhost:8080";
  recurso: string = "helpinghands/users";

  constructor(private http: HttpClient) { }

  login(user: User) {
    return this.http.post<Token>(this.ruta_servidor + "/" + this.recurso + "/" + "login", user).pipe(
      tap((respuesta: Token) => {
        localStorage.setItem("jwtToken", respuesta.jwtToken);
        localStorage.setItem("userId", respuesta.userId.toString());
        localStorage.setItem("authorities", respuesta.authorities);
      }
      )
    );
  }

  logout() {
    localStorage.clear();
  }

  hayUsuarioLogeado() {
    if (this.getUserIdActual() == null || this.getUserIdActual() == "") {
      return false;
    }
    return true;
  }

  getTokenActual() {
    if (typeof localStorage != "undefined") {
      return localStorage.getItem("jwtToken");
    }
    return null;
  }

  getUserIdActual() {
    if (typeof localStorage != "undefined") {
      return localStorage.getItem("userId");
    }
    return null;
  }

  getAuthoritiesActual() {
    if (typeof localStorage != "undefined") {
      return localStorage.getItem("authorities");
    }
    return null;
  }


}

import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrl: './cabecera.component.css'
})
export class CabeceraComponent {

  constructor (private userService: UserService, private router: Router) {}

  hayUsuarioLogeado() {
    return this.userService.hayUsuarioLogeado();
  }

  logout(){
    this.userService.logout();
    this.router.navigate(["/"]);
  }
}

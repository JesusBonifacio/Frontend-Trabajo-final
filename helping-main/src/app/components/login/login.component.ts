import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { Token } from '../../models/token';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!:FormGroup;
  hayError:boolean=false;


  constructor (private userService: UserService, private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(){
    this.crearForm();
  }

  crearForm(){
    this.loginForm = this.formBuilder.group({
      userName: ["", [Validators.required]],
      password: ["", [Validators.required]]
    })
  }

  login(){
    const user:User = {
      id:0,
      userName: this.loginForm.get('userName')?.value,
      password: this.loginForm.get('password')?.value,
      enabled: true,
      authorities:""
    };

    this.userService.login(user).subscribe({
      next:(data:Token)=>{
        this.router.navigate(["/home"]);
      },
      error:(err)=>{
        this.hayError=true;
        console.log(err);
      }
    })
  }

}

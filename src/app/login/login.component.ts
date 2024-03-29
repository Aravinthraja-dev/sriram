import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminAuthGuardService } from 'src/services/admin-auth-guard.service';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private auth: AuthService, private router: Router, private admin: AdminAuthGuardService) { }

  login = new FormGroup({
    username: new FormControl('',[
      Validators.required,
      Validators.maxLength(15),
      Validators.minLength(3)
    ]),
    password: new FormControl('',[
      Validators.required,
      Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$")
    ])
  });
  
  get all(){
    return this.login.controls;
  }

  loginWithGoogle(){
    this.auth.signInWithGoogle().then((res:any) => {
    }).catch((error:any)=>{
      console.error(error);
    })
  }
}

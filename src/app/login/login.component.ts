import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

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
}

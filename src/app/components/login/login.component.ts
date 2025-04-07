import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private auth: AuthService) { }

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
      console.log('Lazy Loading activated')
    }).catch((error:any)=>{
      console.error(error);
    })
  }
}

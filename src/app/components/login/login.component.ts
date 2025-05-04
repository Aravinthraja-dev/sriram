import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  login!: FormGroup
  errorMessage: string = '';

  constructor(
    private auth: AuthService,
    private fb: FormBuilder
  ) { 
    this.login = this.fb.group({
      username: new FormControl('',[
        Validators.required,
        Validators.maxLength(15),
        Validators.minLength(3)
      ]),
      password: new FormControl('',[
        Validators.required,
        Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$")
      ])
    })
  }
  
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

  async onSubmit() {
    if (this.login.invalid) return;

    try {
      const { email, password } = this.login.value;
      await this.auth.login(email, password);
    } catch (error: any) {
      this.errorMessage = this.getErrorMessage(error.code);
    }
  }

  private getErrorMessage(code: string): string {
    switch (code) {
      case 'auth/user-not-found':
        return 'No account found with this email.';
      case 'auth/wrong-password':
        return 'Incorrect password.';
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      default:
        return 'Login failed. Please try again.';
    }
  }
}

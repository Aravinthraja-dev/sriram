import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
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
      username: new FormControl('', [
        Validators.required,
        Validators.maxLength(15),
        Validators.minLength(3)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$")
      ])
    })
  }

  get all() {
    return this.login.controls;
  }

  loginWithGoogle() {
    this.auth.signInWithGoogle().catch(error => console.error(error));
  }

  async onSubmit() {
    try {
      const rawForm = this.login.getRawValue();
      await this.auth.login(rawForm.username, rawForm.password);
      console.log('Login successful & navigation completed.');
    } catch (error) {
      console.error('Login failed:', error);
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

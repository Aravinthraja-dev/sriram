import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  register!: FormGroup

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.register = this.fb.group({
      username: new FormControl('', [
        Validators.required,
        Validators.maxLength(15),
        Validators.minLength(3)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$")
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ])
    })
  }

  get all(){
    return this.register.controls;
  }

  onSubmit() {
    const rawForm = this.register.getRawValue()
    this.auth.register(rawForm.email, rawForm.username, rawForm.password).then(() => {
      this.router.navigate(['/login'])
    }).catch(error => {
       console.error('Registration failed:', error);
    })
  }
}

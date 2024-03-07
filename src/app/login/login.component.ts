import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ENDPOINTS } from '../endpoints';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm!: FormGroup;
  constructor(
    private readonly fb: FormBuilder,

    private readonly http: HttpClient,
    private readonly router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onLogin() {
    if (this.loginForm.invalid) {
      return;
    }
    this.http.post(ENDPOINTS.login, this.loginForm.value).subscribe({
      next: (res) => {
        // put token in local storage
        localStorage.setItem('token', JSON.stringify(res));
        console.log('ok');
        this.router.navigate(['/info']);
      },
      error: (err) => {
        alert('something went wrong');
      },
    });
    console.log(this.loginForm.value);
  }

  onRegister() {
    if (this.loginForm.invalid) {
      return;
    }
    this.http.post(ENDPOINTS.register, this.loginForm.value).subscribe({
      next: (res) => {
        // put token in local storage
        localStorage.setItem('token', JSON.stringify(res));
        this.router.navigate(['/info']);
        console.log('ok');
      },
      error: (err) => {
        alert('something went wrong');
      },
    });
    console.log(this.loginForm.value);
  }
}

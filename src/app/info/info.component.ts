import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ENDPOINTS } from '../endpoints';
import { AuthenticationService } from '../services/auth.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {
  info: any = { email: 'test@gmail.com', password: '1234' };
  token: any = undefined;
  isLoggedIn = false;
  constructor(
    private readonly http: HttpClient,
    private readonly authService: AuthenticationService
  ) {
    this.isLoggedIn = this.authService.isLoggedIn;
  }

  ngOnInit(): void {
    this.geToken();
    this.token = localStorage.getItem('token');
  }

  // get token from api if needed
  geToken() {
    this.http.get(ENDPOINTS.info).subscribe({
      next: (res: any) => {
        this.info = res[0];
      },
      error: () => {
        alert('Something went wrong');
      },
    });
  }
  logout() {
    this.authService.logout();
  }
}

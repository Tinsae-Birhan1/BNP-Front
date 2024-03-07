import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ENDPOINTS } from '../endpoints';
import { AuthenticationService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
})
export class UpdateComponent implements OnInit {
  token: any = undefined;
  constructor(
    private readonly http: HttpClient,
    private readonly authService: AuthenticationService,
    private readonly router: Router
  ) {}
  ngOnInit(): void {
    // check if parsing is required then use JSON.parse()
    this.token = this.authService.currentUserValue;
  }

  onUpdate() {
    this.http.post(ENDPOINTS.update, {}).subscribe({
      next: (res) => {
        this.router.navigate(['/info']);
      },
      error: (err) => {
        alert('something went wrong');
      },
    });
  }
}

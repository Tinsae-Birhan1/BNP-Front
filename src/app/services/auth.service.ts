import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  public currentUser: Observable<any>;
  private currentUserSubject: BehaviorSubject<any>;
  constructor() {
    this.currentUserSubject = new BehaviorSubject<any>(
      localStorage.getItem('token')
        ? JSON.parse(localStorage.getItem('token') ?? '')
        : null
    );

    this.currentUser = this.currentUserSubject.asObservable();
  }
  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  public get isLoggedIn(): boolean {
    console.log(this.currentUserValue);
    return this.currentUserValue ? true : false;
  }
  logout() {
    localStorage.removeItem('token');
  }
}

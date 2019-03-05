import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isUserLogged = true;

  constructor() {
  }

  isUserLoggedIn() {
     this.isUserLogged  = !!localStorage.getItem('token');
     return this.isUserLogged;

  }

  signIn(email: string, password: string) {
    localStorage.setItem('token', email);
    return true;
  }

  signUp(username: string, email: string, password: string) {
    localStorage.setItem('token', email);
    return true;
  }

  logout() {
    localStorage.removeItem('token');
    this.isUserLogged = false;
  }
}

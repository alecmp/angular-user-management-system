import {EventEmitter, Injectable, Output} from '@angular/core';
import {User} from '../classes/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isUserLogged = true;
  @Output() usersignedin = new EventEmitter<User>();
  @Output() usersignedup = new EventEmitter<User>();
  @Output() userlogout = new EventEmitter<User>();

  constructor() {
  }

  isUserLoggedIn() {
    this.isUserLogged = !!localStorage.getItem('token');
    return this.isUserLogged;

  }

  signIn(email: string, password: string) {
    localStorage.setItem('token', email);
    const user = new User();
    user.name = 'Test';
    user.email = email;
    this.usersignedin.emit(user);
    return true;
  }

  signUp(username: string, email: string, password: string) {
    const user = new User();
    user.name = 'Test';
    user.email = email;
    this.usersignedup.emit(user);
    localStorage.setItem('token', email);
    return true;
  }

  logout() {
    localStorage.removeItem('token');
    this.userlogout.emit();
    this.isUserLogged = false;
  }
}

import {EventEmitter, Injectable, Output} from '@angular/core';
import {User} from '../classes/User';
import { environment } from '../../environments/environment';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
interface Jwt {
  access_token: string;
  token_type: string;
  expires_in: number;
  user_name: string;
  email: string;
}
@Injectable()
export class AuthService {
  private isUserLogged = false;
  @Output() usersignedin = new EventEmitter<User>();
  @Output() usersignedup = new EventEmitter<User>();
  @Output() userlogout = new EventEmitter();
  private APIAUTHURL = environment.APIAUTH;
  constructor(private http: HttpClient) {
  }

  isUserLoggedIn() {

    this.isUserLogged = !!localStorage.getItem('token');
    //  alert(localStorage.getItem('token'))
    return this.isUserLogged;
  }

  signIn(email: string, password: string) {

    this.http.post(this.APIAUTHURL + 'login',
      {
        email: email,
        password: password
      }
    ).subscribe(
      (payload: Jwt) => {
        localStorage.setItem('token', payload.access_token);
        console.log(payload);
        localStorage.setItem('user' , JSON.stringify(payload));
        const user = new User();
        user.name = payload.user_name;
        user.email = payload.email;
        this.usersignedin.emit(user);
        return true;

      } ,
      (httpResp: HttpErrorResponse) => {

        alert(httpResp.message);
      }
    );


  }

  signUp(username: string, email: string, password: string) {


    const user = new User();
    user.name = username;
    user.email = email;

    this.http.post(this.APIAUTHURL + '/signup',
      {
        email: email,
        password: password,
        name : username
      }
    ).subscribe(
      (payload: Jwt) => {
        localStorage.setItem('token', payload.access_token);
        console.log(payload);
        localStorage.setItem('user' , JSON.stringify(payload));

        this.usersignedup.emit(user);


      } ,
      (httpResp: HttpErrorResponse) => {

        alert(httpResp.message);
      }
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.userlogout.emit();
    this.isUserLogged = false;
  }
  getUser(): User {
    const data = JSON.parse(localStorage.getItem('user'));
    const user = new User();
    if (data) {
      user.name = data['user_name'];
      user.email = data['email'];
    }
    return user;
  }
  getToken() {
    return localStorage.getItem('token');
  }
}

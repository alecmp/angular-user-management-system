import {Injectable} from '@angular/core';
import {User} from '../classes/User';
import {UserInterface} from '../interfaces/user';
import {HttpClient} from '@angular/common/http';
@Injectable()
export class UserService {
  users: User[] = [];
  private APIURL = 'http://localhost:8000/users';

  constructor(private http: HttpClient) {
  }

  getUsers() {
    return  this.http.get(this.APIURL);
  }
  getUser(id: number) {
    return  this.http.get(this.APIURL + '/' + id);
  }

  deleteUser(user) {
    const data = {_method: 'DELETE'} ;
    return  this.http.post(this.APIURL + '/' + user.id ,  data);
  }
  updateUser(user: UserInterface) {
    user['_method'] = 'PUT';
    return  this.http.post(this.APIURL + '/' + user.id , user);
  }
  createUser(user: UserInterface) {
    return  this.http.post(this.APIURL, user);
  }
}

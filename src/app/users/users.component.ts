import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserService} from '../services/user.service';
import {User} from '../classes/User';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  title = 'Users';
  users: User[] = [];
  @Output() updateUser = new EventEmitter<User>();

  constructor(private  service: UserService) {
  }

  ngOnInit() {
    this.service.getUsers().subscribe(
      response => this.users = response['data']
    );
  }

  onDeleteUser(user: User) {
    const deleteUser = confirm('Do you really want to delete this user?');
    if (deleteUser) {
      this.service.deleteUser(user).subscribe(
        response => {
          const idx = this.users.indexOf(user);
          this.users.splice(idx, 1);
          alert(response['message']);
        }
      );
    }
  }

  onSelectUser(user: User) {
    const userCopy = Object.assign({}, user);
    this.updateUser.emit(userCopy);
  }
}

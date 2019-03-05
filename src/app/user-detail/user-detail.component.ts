import {Component, Input, OnInit} from '@angular/core';
import {User} from '../classes/User';
import {UserService} from '../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  private userCopy: User;
  private __user: User;

  @Input() set user(user: User) {
    this.__user = user;

  }

  get user() {
    return this.__user;
  }

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router
  ) {
  }

  ngOnInit() {
    this.user = new User();
    this.route.paramMap.subscribe(
      (params) => {
        if (!params.get('id')) {
          return;
        }
        this.userService.getUser(+params.get('id')).subscribe(
          response => this.user = response['data']
        );
      }
    );
  }

  saveUser() {
    if (this.user.id > 0) {
      this.updateUser(this.user);
    } else {
      this.createUser(this.user);
    }
  }

  createUser(user: User) {
    this.userService.createUser(this.user).subscribe(response => {
      if (response['success']) {
        alert('User ' + user.name + ' Creato correttamente');
      } else {
        alert(response['message']);
      }
      this.router.navigate(['users']);
    });
  }

  updateUser(user: User) {
    this.userService.updateUser(this.user).subscribe(response => {
        if (response['success']) {
          alert('User ' + user.name + ' Modificato correttamente');
        } else {
          alert(response['message']);
        }
        this.router.navigate(['users']);
      }
    );
  }

  resetForm() {

    if (this.user.id === 0) {
      this.user = new User();
    } else {
      this.user = this.userCopy;
    }
  }

  backToUsers() {
    this.router.navigate(['users']).then();
  }
}

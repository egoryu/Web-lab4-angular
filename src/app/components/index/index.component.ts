import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import { User } from 'src/app/models/user/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  login:string;
  password:string;
  password2:string;
  isRegister:boolean;

  constructor(private router: Router, private userService: UserService) {
    this.login = "kek";
    this.password = "kek";
    this.password2 = "kek";
    this.isRegister = false;
  }

  ngOnInit(): void {
    this.userService.username = "";
    this.userService.token = "";
  }

  onRegister(): void {
    this.isRegister = !this.isRegister;
  }

  goMainLogin(): void {
    this.userService.checkUser(new User(this.login, this.password, "", "")).subscribe(data => {
      if (data != null) {
        this.userService.token = data.result;
        this.userService.username = this.login;
        this.router.navigate(['/main']);
      }
    });
  }

  goMainRegistration(): void {
    this.userService.registration(new User(this.login, this.password, "", "")).subscribe(data => {
      if (data != null) {
        this.userService.token = data.result;
        this.userService.username = this.login;
        this.router.navigate(['/main']);
      }
    });
  }
}

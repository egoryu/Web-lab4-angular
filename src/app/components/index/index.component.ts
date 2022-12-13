import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import { User } from 'src/app/models/user/user';
import { PointService } from 'src/app/services/point/point.service';
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
  isUsername: boolean;
  isPassword: boolean;
  isPassword2: boolean;
  isEqualPassword: boolean;
  isLoginError: boolean;
  isRegisterError: boolean;

  constructor(private router: Router, private userService: UserService, private pointSevice: PointService) {
    this.login = "kek";
    this.password = "kek";
    this.password2 = "kek";
    this.isRegister = false;
    this.isUsername = true;
    this.isPassword = true;
    this.isPassword2 = true;
    this.isEqualPassword = true;
    this.isLoginError = true;
    this.isRegisterError = true;
  }

  ngOnInit(): void {

  }

  onRegister(): void {
    this.isRegister = !this.isRegister;
  }

  onUsername(): void {
    if (this.login.length == 0)
      this.isUsername = false;
    else
      this.isUsername = true;
  }

  onPassword(): void {
    if (this.password.length == 0)
      this.isPassword = false;
    else
      this.isPassword = true;
  }

  onPassword2(): void {
    if (this.password2.length == 0)
      this.isPassword2 = false;
    else
      this.isPassword2 = true;
  }

  onEqualPassword() {
    if (this.password == this.password2)
      this.isEqualPassword = true;
    else
      this.isEqualPassword = false;
  }

  goMainLogin(): void {
    this.userService.checkUser(new User(this.login, this.password, "", "")).subscribe(data => {
      if (data != null) {
        this.pointSevice.token = data.result;
        this.pointSevice.username = this.login;
        localStorage.setItem("login", this.login);
        localStorage.setItem("token", data.result);
        this.router.navigate(['/main']);
        this.isLoginError = true;
      } else {
        this.isRegisterError = true;
        this.isLoginError = false;
      }
    });
  }

  goMainRegistration(): void {
    this.userService.registration(new User(this.login, this.password, "", "")).subscribe(data => {
      if (data != null) {
        this.pointSevice.token = data.result;
        this.pointSevice.username = this.login;
        localStorage.setItem("login", this.login);
        localStorage.setItem("token", data.result);
        this.router.navigate(['/main']);
        this.isRegisterError = true;
      } else {
        this.isLoginError = true;
        this.isRegisterError = false;
      }
    });
  }
}

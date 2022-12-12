import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { User } from 'src/app/models/user/user';

@Injectable()
export class UserService {

  private usersUrl: string;
  private activeUrl: string;
  public username: string;
  public token: string;
  private tmp: string;

  constructor(private http: HttpClient) {
    this.usersUrl = 'http://localhost:8080/users';
    this.activeUrl = 'http://localhost:8080/active';
    this.username = "";
    this.token = "";
    this.tmp = "";
  }

  public checkUser(user: User): Observable<string> {
    return this.http.patch<string>(this.usersUrl, user);
  }

  public registration(user: User): Observable<string> {
    return this.http.post<string>(this.usersUrl, user);
  }

  public activeUser(): Observable<number> {
    this.tmp = this.username;
    this.tmp = this.tmp.concat(this.token);
    return this.http.post<number>(this.activeUrl, this.tmp);
  }
}

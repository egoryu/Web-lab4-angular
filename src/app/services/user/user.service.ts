import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Result } from 'src/app/models/result';
import { User } from 'src/app/models/user/user';

@Injectable()
export class UserService {

  private usersUrl: string;
  private activeUrl: string;
  private checkUrl: string;
  public username: string;
  public token: string;

  constructor(private http: HttpClient) {
    this.usersUrl = 'http://localhost:8080/users';
    this.activeUrl = 'http://localhost:8080/active';
    this.checkUrl = 'http://localhost:8080/check';
    this.username = "";
    this.token = "";
  }

  public checkUser(user: User): Observable<Result> {
    return this.http.post<Result>(this.checkUrl, user);
  }

  public registration(user: User): Observable<Result> {
    return this.http.post<Result>(this.usersUrl, user);
  }

  public activeUser(): Observable<Result> {
    return this.http.post<Result>(this.activeUrl, new Result(this.username, 0, this.token));
  }
}

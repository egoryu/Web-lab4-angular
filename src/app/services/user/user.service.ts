import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Result } from 'src/app/models/result';
import { User } from 'src/app/models/user/user';

@Injectable({ providedIn: 'root' })
export class UserService {

  private usersUrl: string;
  private checkUrl: string;


  constructor(private http: HttpClient) {
    this.usersUrl = 'http://localhost:8080/users';
    this.checkUrl = 'http://localhost:8080/check';
  }

  public checkUser(user: User): Observable<Result> {
    return this.http.post<Result>(this.checkUrl, user);
  }

  public registration(user: User): Observable<Result> {
    return this.http.post<Result>(this.usersUrl, user);
  }
}

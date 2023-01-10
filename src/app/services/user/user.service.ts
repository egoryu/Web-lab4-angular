import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { RequestUser } from 'src/app/models/request/request-user';
import { ResponseString } from 'src/app/models/response/response-string';

@Injectable({ providedIn: 'root' })
export class UserService {

  private usersUrl: string;
  private checkUrl: string;
  private logoutUrl: string;


  constructor(private http: HttpClient) {
    this.usersUrl = 'http://localhost:8080/user/auth/users';
    this.checkUrl = 'http://localhost:8080/user/auth/check';
    this.logoutUrl = 'http://localhost:8080/user/logout';
  }

  public checkUser(user: RequestUser): Observable<ResponseString> {
    return this.http.post<ResponseString>(this.checkUrl, user);
  }

  public registration(user: RequestUser): Observable<ResponseString> {
    return this.http.post<ResponseString>(this.usersUrl, user);
  }
  
  public logout(token: string) {
    return this.http.post<ResponseString>(this.logoutUrl, token);
  }
}

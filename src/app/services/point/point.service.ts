import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { ResponsePoint } from 'src/app/models/response/response-point';
import { RequestPoint } from 'src/app/models/request/request-point';
import { ResponseString } from 'src/app/models/response/response-string';
import { RequestUser } from 'src/app/models/request/request-user';

@Injectable({ providedIn: 'root' })
export class PointService {

  private pointsUrl: string;
  private activeUrl: string;
  public username: string;
  public token: string;

  constructor(private http: HttpClient) {
    this.pointsUrl = 'http://localhost:8080/point/points';
    this.activeUrl = 'http://localhost:8080/point/active';
    this.username = "";
    this.token = "";
    // @ts-ignore
    this.username = localStorage.getItem("login");
    // @ts-ignore
    this.token = localStorage.getItem("token");
    if (this.username == null || this.token == null) {
      this.username = "";
      this.token = "";
    }
  }

  public findAll(): Observable<ResponsePoint[]> {
    return this.http.get<ResponsePoint[]>(this.pointsUrl);
  }

  public save(point: RequestPoint) {
    return this.http.post<ResponsePoint>(this.pointsUrl, point);
  }

  public clear(): Observable<ResponseString> {
    return this.http.delete<ResponseString>(this.pointsUrl);
  }
}

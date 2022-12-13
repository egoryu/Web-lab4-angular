import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Point } from "../../models/point/point";
import { Observable } from 'rxjs/internal/Observable';
import { Result } from 'src/app/models/result';

@Injectable({ providedIn: 'root' })
export class PointService {

  private pointsUrl: string;
  private activeUrl: string;
  public username: string;
  public token: string;

  constructor(private http: HttpClient) {
    this.pointsUrl = 'http://localhost:8080/points';
    this.activeUrl = 'http://localhost:8080/active';
    this.username = "";
    this.token = "";
  }

  public findAll(): Observable<Point[]> {
    return this.http.get<Point[]>(this.pointsUrl);
  }

  public save(point: Point) {
    return this.http.post<Point>(this.pointsUrl, point);
  }

  public clear() {
    return this.http.delete(this.pointsUrl);
  }

  public activeUser(): Observable<Result> {
    console.log(this.username, this.token);
    return this.http.post<Result>(this.activeUrl, new Result(this.username, this.token));
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Point } from "../../models/point/point";
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class PointService {

  private pointsUrl: string;

  constructor(private http: HttpClient) {
    this.pointsUrl = 'http://localhost:8080/points';
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
}

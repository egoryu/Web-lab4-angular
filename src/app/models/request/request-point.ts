import { Point } from "../point/point";
import { User } from "../user/user";

export class RequestPoint implements Point {
    username: string;
    x: number;
    y: number;
    r: number;

  constructor(username: string, x: number, y: number, r: number) {
    this.username = username;
    this.x = x;
    this.y = y;
    this.r = r;
  }
}

import { Point } from "../point/point";

export class ResponsePoint implements Point {
    x: number;
    y: number;
    r: number;
    h: string;

  constructor(x: number, y: number, r: number, h: string) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.h = h;
  }
}

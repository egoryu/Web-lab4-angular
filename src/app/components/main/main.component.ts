import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { RequestPoint } from 'src/app/models/request/request-point';
import { ResponsePoint } from 'src/app/models/response/response-point';
import { PointService } from 'src/app/services/point/point.service';
import { UserService } from 'src/app/services/user/user.service';

import {SliderModule} from 'primeng/slider';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  @ViewChild('canvas', {static: true})
  canvas!: ElementRef<HTMLCanvasElement>;

  points: ResponsePoint[];
  point: RequestPoint;
  name: string;
  isValid: boolean;
  isValidR: boolean;

  private ctx!: CanvasRenderingContext2D;

  constructor(private router: Router, private pointService: PointService, private userService: UserService) {
    this.points = [];
    this.name = this.pointService.username;
    this.point = new RequestPoint(this.pointService.username, 0, 0, 0);
    this.isValid = true;
    this.isValidR = true;

  }

  ngOnInit(): void {
    this.pointService.findAll().subscribe(data => {
      this.points = data;
    }, error => {
      if (error.status == 401) {
        this.pointService.username = "";
        this.pointService.token = "";
        localStorage.removeItem("login");
        localStorage.removeItem("token");
        this.router.navigate(['/index']);
      }
    });

    if (this.canvas.nativeElement.getContext("2d") != null) {
      // @ts-ignore
      this.ctx = this.canvas.nativeElement.getContext("2d");
      this.drawPlot(this.ctx);
    }

    this.canvas.nativeElement.addEventListener("click", this.MouseEvent.bind(this));
  }

  onSubmit() {
    if (this.valid() == false) {
      this.isValid = false;
      return;
    }
    this.pointService.save(this.point).subscribe( data => {
      if (data != null) {
        if (this.points == null)
          this.points = [];
        this.points.push(data);
        this.loadTablePoints();
        this.isValid = true;
      } else {
        this.isValid = false;
      }
    }, error => {
      if (error.status == 401) {
        this.pointService.username = "";
        this.pointService.token = "";
        localStorage.removeItem("login");
        localStorage.removeItem("token");
        this.router.navigate(['/index']);
      }
    });
  }

  onClear() {
    this.pointService.clear().subscribe(data => {
      if (data != null && data.answer == "successful") {
        this.points = [];
        this.loadTablePoints();
      }
    }, error => {
      if (error.status == 401) {
        this.pointService.username = "";
        this.pointService.token = "";
        localStorage.removeItem("login");
        localStorage.removeItem("token");
        this.router.navigate(['/index']);
      }
    });
  }

  onExit() {
    this.userService.logout(this.pointService.token).subscribe(data => {
      this.pointService.username = "";
      this.pointService.token = "";
      localStorage.removeItem("login");
      localStorage.removeItem("token");
      this.router.navigate(['/index']);
    }, error => {
      this.pointService.username = "";
      this.pointService.token = "";
      localStorage.removeItem("login");
      localStorage.removeItem("token");
      this.router.navigate(['/index']);
    })
  }

  //valid

  valid(): boolean {
    if (this.point.x <= -5 || this.point.x >= 3 || this.point.y <= -5 || this.point.y >= 5)
      return false;
    return true;
  }

  //canvas

  drawPlot(ctx: CanvasRenderingContext2D) {
    this.canvas.nativeElement.width = 320;
    this.canvas.nativeElement.height = 320;
    let width = 320,
      high = 320;

    ctx.fillStyle = '#00FFFF';

    ctx.beginPath();
    //radius
    ctx.arc(width / 2, high / 2, 75, 3 * Math.PI / 2, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(160, 160);
    ctx.lineTo(235, 160);
    ctx.lineTo(160, 85);
    ctx.closePath();
    ctx.fill();
    //square
    ctx.fillRect(10, 160, 150, -75);

    //triangle
    ctx.beginPath();
    ctx.moveTo(235, 160);
    ctx.lineTo(160, 160);
    ctx.lineTo(160, 310);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = 'black';
    ctx.font = "15px Arial bold"

    //0x
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, 160);
    ctx.lineTo(320, 160);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(320, 160);
    ctx.lineTo(315, 155);
    ctx.lineTo(315, 165);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(10, 156);
    ctx.lineTo(10, 164);
    ctx.stroke();
    ctx.fillText("-R", 10, 156);

    ctx.beginPath();
    ctx.moveTo(85, 156);
    ctx.lineTo(85, 164);
    ctx.stroke();
    ctx.fillText("-R/2", 85, 156);

    ctx.beginPath();
    ctx.moveTo(235, 156);
    ctx.lineTo(235, 164);
    ctx.stroke();
    ctx.fillText("R/2", 235, 156);

    ctx.beginPath();
    ctx.moveTo(310, 156);
    ctx.lineTo(310, 164);
    ctx.stroke();
    ctx.fillText("R", 308, 156);
    ctx.fillText("X", 310, 180);

    //0y
    ctx.beginPath();
    ctx.moveTo(160, 0);
    ctx.lineTo(160, 320);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(160, 0);
    ctx.lineTo(155, 5);
    ctx.lineTo(165, 5);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(156, 10);
    ctx.lineTo(164, 10);
    ctx.stroke();
    ctx.fillText("R", 164, 15);

    ctx.beginPath();
    ctx.moveTo(156, 85);
    ctx.lineTo(164, 85);
    ctx.stroke();
    ctx.fillText("R/2", 164, 90);

    ctx.beginPath();
    ctx.moveTo(156, 235);
    ctx.lineTo(164, 235);
    ctx.stroke();
    ctx.fillText("-R/2", 164, 240);

    ctx.beginPath();
    ctx.moveTo(156, 310);
    ctx.lineTo(164, 310);
    ctx.stroke();
    ctx.fillText("-R", 164, 315);
    ctx.fillText("Y", 145, 10);
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, 320, 320);
  }

  drawPoint(x: number, y: number, r: number, h: string) {
    if (this.point.r !== r)
      return;

    if (x > 320 || x < -320 || y > 320 || y < -320)
      return;

    this.ctx.beginPath();
    this.ctx.fillStyle = h == "miss" ? 'red' : 'green';
    this.ctx.arc(x, y, 2, 0, 2 * Math.PI);
    this.ctx.fill();
  }

  MouseEvent (event: MouseEvent) {
    this.loadTablePoints();


    if (this.point.r <= 0)
      return;

    let xFromCanvas = (event.offsetX - 160) / 150 * this.point.r;
    let minDifference = Infinity;
    let nearestXValue;
    let index = 0;

    this.point.x = parseFloat(xFromCanvas.toFixed(1));

    let yValue = (-event.offsetY + 160) / 150 * this.point.r;
    if (yValue < -5) yValue = -5;
    else if (yValue > 5) yValue = 5;

    this.point.y = parseFloat(yValue.toFixed(1));

    this.drawPoint(this.point.x * 150 / this.point.r + 160, -(yValue / this.point.r *  150 - 160), this.point.r, "miss");
    this.onSubmit();
  }

  loadTablePoints() {
    this.clearCanvas();
    this.drawPlot(this.ctx);

    if (this.point.r <= 0 || this.point.r > 3) {
      this.isValidR = false;
      return;
    } else {
      this.isValidR = true;
      this.isValid =true;
    }

    if (this.points == null)
      return;
    for (let x of this.points) {
      if (x.r == this.point.r)
        this.drawPoint(x.x  * 150 / x.r + 160, -(x.y / x.r * 150 - 160), x.r, x.h);
    }
  }
}


function valid() {
    throw new Error('Function not implemented.');
}


import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Point } from 'src/app/models/point/point';
import { PointService } from 'src/app/services/point/point.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  @ViewChild('canvas', {static: true})
  canvas!: ElementRef<HTMLCanvasElement>;

  points: Point[];
  point: Point;
  name: string;
  isValid: boolean;
  isValidR: boolean;

  private ctx!: CanvasRenderingContext2D;

  constructor(private router: Router, public pointService: PointService, private userService: UserService) {
    this.points = [];
    this.point = new Point();
    this.name = this.pointService.username;
    this.isValid = true;
    this.isValidR = true;
  }

  ngOnInit(): void {
    this.pointService.findAll().subscribe(data => {
      this.points = data;
    });

    this.pointService.activeUser().subscribe(data => {
      console.log(data)
      if (data === null) {
        this.pointService.username = "";
        this.pointService.token = "";
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
    this.pointService.save(this.point).subscribe( data => {
      if (data != null) {
        this.points.push(data);
        this.loadTablePoints();
        this.isValid = true;
      } else {
        this.isValid = false;
      }
    });
  }

  onClear() {
    this.pointService.clear().subscribe();
    this.points = [];
  }

  onExit() {
    this.pointService.username = "";
    this.pointService.token = "";
    this.router.navigate(['/index']);
  }

  //canvas

  drawPlot(ctx: CanvasRenderingContext2D) {
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

  drawPoint(x: number, y: number, r: number, h: number) {
    if (this.point.r !== r)
      return;

    if (x > 320 || x < -320 || y > 320 || y < -320)
      return;

    this.ctx.beginPath();
    this.ctx.fillStyle = h == 0 ? 'red' : 'green';
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

    this.drawPoint(this.point.x * 150 / this.point.r + 160, -(yValue / this.point.r *  150 - 160), this.point.r, 0);
    this.onSubmit();
  }

  loadTablePoints() {
    this.clearCanvas();
    this.drawPlot(this.ctx);

    if (this.point.r <= 0) {
      this.isValidR = false;
      return;
    } else {
      this.isValidR = true;
      this.isValid =true;
    }

    for (let x of this.points) {
      if (x.r == this.point.r)
        this.drawPoint(x.x  * 150 / x.r + 160, -(x.y / x.r * 150 - 160), x.r, x.hit);
    }
  }
}



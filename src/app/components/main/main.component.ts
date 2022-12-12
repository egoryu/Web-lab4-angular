import { Component, OnInit } from '@angular/core';
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
  points: Point[];
  point: Point;

  constructor(private router: Router, private pointService: PointService, public userService: UserService) {
    this.points = [];
    this.point = new Point();
  }

  ngOnInit(): void {
    this.pointService.findAll().subscribe(data => {
      this.points = data;
    });

    this.userService.activeUser().subscribe(data => {
      console.log(data);
      console.log(data.numberResault == 0);
      if (data.numberResault) {
        this.userService.username = "";
        this.userService.token = "";
        this.router.navigate(['/index']);
      }
    });
  }

  onSubmit() {
    this.pointService.save(this.point).subscribe( data => {
      this.points.push(data);
    });
  }

  onClear() {
    this.pointService.clear().subscribe();
    this.points = [];
  }

  onExit() {
    this.userService.username = "";
    this.userService.token = "";
    this.router.navigate(['/index']);
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dash-initi',
  templateUrl: './dash-initi.component.html',
  styleUrls: ['./dash-initi.component.scss']
})
export class DashInitiComponent implements OnInit {

  public value = 1000;
  constructor(
    public router: Router,
  ) { }

  ngOnInit() {
  }
  dashboard() {
    this.router.navigate(['/dashboard']);
  }
}

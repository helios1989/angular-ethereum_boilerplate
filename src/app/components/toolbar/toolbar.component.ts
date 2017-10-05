import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.styl']
})
export class ToolbarComponent implements OnInit {
  username: string;
  constructor(
    private router: Router,
  ) {}

  ngOnInit() {
  }

  goHome() {
    this.router.navigate(['landing']);
  }
}

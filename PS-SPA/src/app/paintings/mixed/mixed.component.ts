import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mixed',
  templateUrl: './mixed.component.html',
  styleUrls: ['./mixed.component.css']
})
export class MixedComponent implements OnInit {

  paintingSource: string = 'Name of image';

  constructor() { }

  ngOnInit(): void {
  }

}

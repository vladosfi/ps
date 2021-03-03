import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-thumb',
  templateUrl: './thumb.component.html',
  styleUrls: ['./thumb.component.css']
})
export class ThumbComponent implements OnInit {
  @Input() paintings: any;
  
  constructor() { }

  ngOnInit(): void {
  }

}

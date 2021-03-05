import { Component, Input, OnInit } from '@angular/core';
import { IPainting } from 'src/app/_interfaces/painting';

@Component({
  selector: 'app-thumb',
  templateUrl: './thumb.component.html',
  styleUrls: ['./thumb.component.css']
})
export class ThumbComponent implements OnInit {
  @Input() paintingSource: IPainting;
  imagesUrl = 'http://localhost:5000/';
  
  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { IPainting } from 'src/app/_interfaces/painting';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-thumb',
  templateUrl: './thumb.component.html',
  styleUrls: ['./thumb.component.css']
})
export class ThumbComponent implements OnInit {
  @Input() paintingSource: IPainting;
  localhost = environment.localhost;
  
  
  constructor() { }

  ngOnInit(): void {
  }

}

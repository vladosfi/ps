import { Component, Input, OnInit } from '@angular/core';
import { IPainting } from 'src/app/_interfaces/painting';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-painting-list-thumb',
  templateUrl: './admin-painting-list-thumb.component.html',
  styleUrls: ['./admin-painting-list-thumb.component.css']
})
export class AdminPaintingListThumbComponent implements OnInit {
  @Input() paintingDetails: IPainting;
  localhost = environment.localhost;
    
  constructor() { }

  ngOnInit(): void {
  }

}

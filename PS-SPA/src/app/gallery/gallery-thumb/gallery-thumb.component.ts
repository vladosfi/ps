import { unsupported } from '@angular/compiler/src/render3/view/util';
import { Component, Input, OnInit } from '@angular/core';
import { IUser } from 'src/app/_models/user';

@Component({
  selector: 'app-gallery-thumb',
  templateUrl: './gallery-thumb.component.html',
  styleUrls: ['./gallery-thumb.component.css']
})
export class GalleryThumbComponent implements OnInit {
  @Input() user: IUser;
  
  constructor() { }

  ngOnInit(): void {
  }

}

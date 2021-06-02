import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  @Input() isLoading: boolean;
  
  constructor() { }

  ngOnInit(): void {
  }


  //https://www.amadousall.com/angular-routing-how-to-display-a-loading-indicator-when-navigating-between-routes/
  //<!-- <app-loader [isLoading]="!paintings"></app-loader> -->
}

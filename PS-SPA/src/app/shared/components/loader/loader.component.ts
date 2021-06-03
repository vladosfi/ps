import { Component, Input, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/_services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  @Input() isLoading: boolean;
  
  loading: boolean;

  constructor(private loaderService: LoaderService) {

    this.loaderService.isLoading.subscribe((l) => {
      this.isLoading = l;
    });

  }

  ngOnInit(): void {
  }

}

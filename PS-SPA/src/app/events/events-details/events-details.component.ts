import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IEvent } from 'src/app/shared/_interfaces/event';
import { AuthService } from 'src/app/_services/auth.service';
import { ToastService } from 'src/app/_services/toast.service';
import { environment } from 'src/environments/environment';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryImageSize, NgxGalleryOptions } from 'ngx-gallery-9';

@Component({
  selector: 'app-events-details',
  templateUrl: './events-details.component.html',
  styleUrls: ['./events-details.component.css']
})
export class EventsDetailsComponent implements OnInit {
  currentEvent: IEvent;
  baseUrl = environment.localhost;
  localhost = environment.localhost;
  frontEndUrl = environment.frontEndUrl;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(
    private toast: ToastService,
    private route: ActivatedRoute,
    private authService: AuthService) { 
      this.galleryOptions = [{
        width: '600px',
        height: '400px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
      }];
    }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.currentEvent = Object.assign({}, data.events);
      this.galleryImages = this.getImages();
    });
  }

  loggedIn() {
    return this.authService.loggedIn();
  }


  getImages() {
    const imageUrls = [];
    for (let i = 0; i < this.currentEvent.images.length; i++) {

      let image = {
        small: this.baseUrl + this.currentEvent.images[i].url + '/' + this.currentEvent.images[i].imageFileName,
        medium: this.baseUrl + this.currentEvent.images[i].url + '/' + this.currentEvent.images[i].imageFileName,
        big: this.baseUrl + this.currentEvent.images[i].url + '/' + this.currentEvent.images[i].imageFileName,
      };

      if (image.small && image.medium && image.big) {
        imageUrls.push(image);
      }
    }
    return imageUrls;
  }

}

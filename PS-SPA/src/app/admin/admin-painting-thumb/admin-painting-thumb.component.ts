import { Component, EventEmitter, forwardRef, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryImageSize, NgxGalleryOptions } from 'ngx-gallery-9';
import { ModalWindowService } from 'src/app/shared/_service/modal-window.service';
import { IPainting } from 'src/app/_interfaces/painting';
import { IPaintingDetails } from 'src/app/_interfaces/painting-details';
import { PaintingService } from 'src/app/_services/painting.service';
import { ToastService } from 'src/app/_services/toast.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-painting-thumb',
  templateUrl: './admin-painting-thumb.component.html',
  styleUrls: ['./admin-painting-thumb.component.css']
})
export class AdminPaintingThumbComponent implements OnInit {
  localhost = environment.localhost;
  @Input() paintingDetails: IPainting;
  @Output() deletePaintingEvent = new EventEmitter<string>();
  @ViewChild("template") template: TemplateRef<any>;
  textMessage: string = "Are you sure you want to delete?";

  @ViewChild('lgModal') lgModal;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  paintingModal: IPaintingDetails;
  baseUrl = environment.localhost;
  
  
  constructor(
    private modalService: ModalWindowService,
    private paintingService: PaintingService,
    private toast: ToastService) {
      this.galleryOptions = [{
        width: '100%',
        height: '800px',
        imageSize: NgxGalleryImageSize.Contain,
        imagePercent: 85,
        thumbnailsColumns: 4,
        thumbnailSize: NgxGalleryImageSize.Cover,
        thumbnailsPercent: 20,
        //thumbnailsAutoHide: true, 
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false,
      }];
     }

  ngOnInit() { }

  openConfirmModal() {
    this.modalService.openModal(this.template);
  }

  confirm() {
    this.modalService.confirm();

    this.paintingService.deletePainting(this.paintingDetails.id)
      .subscribe(
        () => {
          this.deletePaintingEvent.emit(this.paintingDetails.id);
          this.toast.success('Painting has been deleted');
        },
        (error) => {
          this.toast.error('Failed to delete painting');
    });
  }

  decline() {
    this.modalService.decline();
  }



  getPainting(id: string) {
    const inchesFactor: number = 0.39370;

    this.paintingService.getPainting(id).subscribe(data => {
      this.paintingModal = data;
      this.galleryImages = this.getImages();
      this.lgModal.show();
    });
  }


  
  getImages() {
    const imageUrls = [];
    for (let i = 0; i < this.paintingModal.images.length; i++) {

      let image = {
        small: this.baseUrl + this.paintingModal.images[i].url + '/' + this.paintingModal.images[i].imageFileName,
        medium: this.baseUrl + this.paintingModal.images[i].url + '/' + this.paintingModal.images[i].imageFileName,
        big: this.baseUrl + this.paintingModal.images[i].url + '/' + this.paintingModal.images[i].imageFileName,
        description: this.paintingModal.images[i].description
      };

      if (image.small && image.medium && image.big) {
        imageUrls.push(image);
      }
    }
    return imageUrls;
  }


}
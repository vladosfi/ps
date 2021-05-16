import { Component, Input, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { IImage } from 'src/app/shared/_interfaces/image';
import { ToastService } from 'src/app/_services/toast.service';
import { environment } from 'src/environments/environment';
import { IEvent } from '../../_interfaces/event';
//import { IEvent } from '../../_interfaces/event';
import { ImageService } from '../../_service/image.service';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.css'],
  providers: [ImageService],
})
export class ImageUploaderComponent implements OnInit {
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  localhost = environment.localhost;
  currentMainImage: IImage;
  @Input() event: IEvent;
  
  constructor(private imageService: ImageService, private toast: ToastService ) {   }

  ngOnInit(): void {
    this.initializeUploader();
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    //this.event.images = [];
    
    this.uploader = new FileUploader({
      url:
        this.baseUrl +
        'events/' +
        this.event.id +
        '/images',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024,
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: IImage = JSON.parse(response);
        const image = {
          id: res.id,
          name: res.name,
          url: res.url,
          imageFileName: res.imageFileName,
          isMain: res.isMain,
        };

        this.event.images.push(image);
      }
    };
  }


  setMainImage(image: IImage) {
    this.imageService.setMainImage(this.event.id, image.id)
      .subscribe(
        () => {
          this.currentMainImage = this.event.images.filter((i) => i.isMain === true)[0];
          this.currentMainImage.isMain = false;
          image.isMain = true;
          this.toast.success(`Image ${image.id} is set to main!`)
        },
        (error) => {
          this.toast.error(error);
        }
      );
  }

  deleteImage(image: IImage) {

    if (confirm('Are you sure you want to delete this image?')) {
      this.imageService
        .deleteImage(this.event.id, image.id)
        .subscribe(
          () => {
            this.event.images.splice(this.event.images.findIndex((i) => i.id === image.id), 1);
            this.toast.success('Image has been deleted');
          },
          (error) => {
            this.toast.error('Failed to delete image');
          }
        );
    }
  }
}
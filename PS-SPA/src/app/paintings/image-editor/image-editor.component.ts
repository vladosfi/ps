import { Component, Input, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { IImage } from 'src/app/shared/_interfaces/image';
import { IPaintingDetails } from 'src/app/_interfaces/painting-details';
import { PaintingService } from 'src/app/_services/painting.service';
import { ToastService } from 'src/app/_services/toast.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-image-editor',
  templateUrl: './image-editor.component.html',
  styleUrls: ['./image-editor.component.css']
})
export class ImageEditorComponent implements OnInit {
  @Input() painting: IPaintingDetails;
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  localhost = environment.localhost;
  currentMainImage: IImage;

  constructor(private paintingService: PaintingService,
    private toast: ToastService,) { }

  ngOnInit(): void {
    this.initializeUploader();
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url:
        this.baseUrl +
        'paintings/' +
        this.painting?.id +
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

        this.painting.images.push(image);
      }
    };
  }

  setMainPhoto(image: IImage) {
    this.paintingService
      .setMainImage(this.painting.id, image.id)
      .subscribe(
        () => {
          this.currentMainImage = this.painting.images.filter((i) => i.isMain === true)[0];
          this.currentMainImage.isMain = false;
          image.isMain = true;
          this.toast.success(`Image ${image.id} isset to main!`)
        },
        (error) => {
          this.toast.error(error);
        }
      );
  }

  deleteImage(image: IImage) {

    if (confirm('Are you sure you want to delete this image?')) {
      this.paintingService
        .deleteImage(this.painting.id, image.id)
        .subscribe(
          () => {
            this.painting.images.splice(this.painting.images.findIndex((i) => i.id === image.id), 1);
            this.toast.success('Image has been deleted');
          },
          (error) => {
            this.toast.error('Failed to delete image');
          }
        );
    }
  }

}

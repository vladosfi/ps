import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { IImage } from 'src/app/_interfaces/image';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.css']
})
export class ImageUploaderComponent implements OnInit {
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  localhost = environment.localhost;
  currentMainImage: IImage;
  
  constructor() { }

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
        //this.painting?.id +
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
          url: res.url,
          description: res.description,
          imageFileName: res.imageFileName,
          isMain: res.isMain,
        };

        //this.painting.images.push(image);
      }
    };
  }
}
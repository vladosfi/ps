import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { IPainting } from 'src/app/_interfaces/painting';
import { AuthService } from 'src/app/_services/auth.service';
import { ToastService } from 'src/app/_services/toast.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-image-editor',
  templateUrl: './image-editor.component.html',
  styleUrls: ['./image-editor.component.css']
})
export class ImageEditorComponent implements OnInit {
  @Input() paintings: IPainting[];
  @Output() getMemberPhotoChange = new EventEmitter<string>();
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  currentMain: IPainting;

  constructor(private authService: AuthService,
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
        this.authService.decodedToken.nameid,
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
        const res: IPainting = JSON.parse(response);
        const painting = {
          id: res.id,
          name: res.name,
          mainImageUrl: res.mainImageUrl,
          createdOn: res.createdOn,
          description: res.description,
          isMain: res.isMain,
        };
        
        this.paintings.push(painting);

        if (painting.isMain) {
          this.authService.changeMemberPhoto(painting.mainImageUrl);
          this.authService.currentUser.photoUrl = painting.mainImageUrl;
        }
      }
    };
  }

  setMainPhoto(image: IPainting) {
    // this.userService
    //   .setMainPhoto(this.authService.decodedToken.nameid, image.mainImageUrl)
    //   .subscribe(
    //     () => {
    //       this.currentMain = this.paintings.filter((p) => p.isMain === true)[0];
    //       this.currentMain.isMain = false;
    //       image.isMain = true;
    //       this.getMemberPhotoChange.emit(image.url);
    //       this.authService.changeMemberPhoto(image.url);
    //       this.authService.currentUser.photoUrl = image.url;
          
    //     },
    //     (error) => {
    //       this.toast.error(error);
    //     }
    //   );
  }

  deletePhoto(id: string) {

    // if (confirm('Are you sure you want to delete this photo?')) {
    //   this.userService
    //     .deletePhoto(this.authService.decodedToken.nameid, id)
    //     .subscribe(
    //       () => {
    //         this.paintings.splice(this.paintings.findIndex((p) => p.id === id), 1);
    //         this.toast.success('Photo has been deleted');
    //       },
    //       (error) => {
    //         this.toast.error('Failed to delete photo');
    //       }
    //     );
    // }
  }

}

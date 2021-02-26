import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TimeagoPipe } from 'ngx-timeago';
import { IUser } from 'src/app/_models/user';
import { AuthService } from 'src/app/_services/auth.service';
import { PopupService } from 'src/app/_services/popup.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-gallery-detail-edit',
  templateUrl: './gallery-detail-edit.component.html',
  styleUrls: ['./gallery-detail-edit.component.css']
})
export class GalleryDetailEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  user: IUser;
  live: TimeagoPipe;
  photoUrl: string;
  @HostListener('window:beforeunload', ['$event'])
  uloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }


  constructor(
    private route: ActivatedRoute,
    private popup: PopupService,
    private userService: UserService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });
    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }

  updateUser(updatedUser: IUser) {
    this.userService.updateUsers(this.authService.decodedToken.nameid, updatedUser)
      .subscribe(next => {
        this.popup.success('Profile updated successfully');
        this.editForm.reset(updatedUser);
      }, error => {
        this.popup.error(error);
      });
  }

  updateMainPhoto(photoUrl) {
    this.user.photoUrl = photoUrl;
  }
}

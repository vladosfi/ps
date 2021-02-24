import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { PopupService } from 'src/app/_services/popup.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-gallery-detail',
  templateUrl: './gallery-detail.component.html',
  styleUrls: ['./gallery-detail.component.css']
})
export class GalleryDetailComponent implements OnInit {
  user: User;
  constructor(
    private userService: UserService,
    private popup: PopupService) { }

  ngOnInit(): void {
  }

  loadUser(id: number) {
    this.userService.getUser(id).subscribe();
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUser } from '../../_models/user';
import { PopupService } from '../../_services/popup.service';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-gallery-mixed',
  templateUrl: './gallery-mixed.component.html',
  styleUrls: ['./gallery-mixed.component.css']
})
export class GalleryMixedComponent implements OnInit {
  users: IUser[];

  constructor(private userService: UserService, private popup: PopupService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.users = data['users'];
    })
  }

  loadUsers() {
    this.userService.getUsers().subscribe((users: IUser[]) => {
      this.users = users;
    }, error => {
      this.popup.error(error);
    })
  }

}

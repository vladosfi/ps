import { Component, Input, OnInit } from '@angular/core';
import { IUser } from 'src/app/_interfaces/user';
import { AuthService } from 'src/app/_services/auth.service';
import { ToastService } from 'src/app/_services/toast.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-members-thumb',
  templateUrl: './members-thumb.component.html',
  styleUrls: ['./members-thumb.component.css']
})
export class MemberThumbComponent implements OnInit {
  @Input() user: IUser;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private toast: ToastService) { }

  ngOnInit(): void {
  }

  sendLike(id: number) {
    this.userService.sendLike(this.authService.decodedToken.nameid, id).subscribe(data => {
      this.toast.success('You have liked: ' + this.user.knownAs);
    }, error => {
      this.toast.error(error);
    });
  }

}

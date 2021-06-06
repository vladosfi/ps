import { Component, OnInit } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IUser } from './_interfaces/user';
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  jwtHelper = new JwtHelperService();
  title = "PS"
  loading = false;
  
  constructor(private authService: AuthService,private router: Router) { 
    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const user: IUser = JSON.parse(localStorage.getItem('user'));

    if (token) {
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
    }

    if (user) {
      this.authService.currentUser = user;
      this.authService.changeMemberPhoto(user.photoUrl);
    }
  }
}

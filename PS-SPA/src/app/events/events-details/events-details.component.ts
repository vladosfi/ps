import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IEvent } from 'src/app/shared/_interfaces/event';
import { AuthService } from 'src/app/_services/auth.service';
import { ToastService } from 'src/app/_services/toast.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-events-details',
  templateUrl: './events-details.component.html',
  styleUrls: ['./events-details.component.css']
})
export class EventsDetailsComponent implements OnInit {
  currentEvent: IEvent;
  localhost = environment.localhost;
  frontEndUrl = environment.frontEndUrl;

  constructor(
    private toast: ToastService,
    private route: ActivatedRoute,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.currentEvent = Object.assign({}, data.events);
      
    });
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

}

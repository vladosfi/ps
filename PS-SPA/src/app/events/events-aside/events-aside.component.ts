import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../event.service';
import { IEvent } from '../../shared/_interfaces/event';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-events-aside',
  templateUrl: './events-aside.component.html',
  styleUrls: ['./events-aside.component.css']
})
export class EventsAsideComponent implements OnInit {
  events: IEvent[];
  localhost = environment.localhost;
  language = document.documentElement.lang;
  

  constructor(private eventsService: EventService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.eventsService.getLatestEvents().subscribe(data => {
      this.events = data;

      this.events.forEach(element => {
        element.createdOn = new Date(element?.createdOn);
        
        if(element.mainImageUrl === null){
          element.imageFileName = 'default-event.jpg';
          element.mainImageUrl = '../../../assets/dafault-images';
        }
        else{
          element.mainImageUrl = this.localhost + element.mainImageUrl;
        }
      });
    });    
  }


}

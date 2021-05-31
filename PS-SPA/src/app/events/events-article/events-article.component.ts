import { Component, Input, OnInit } from '@angular/core';
import { IEvent } from 'src/app/shared/_interfaces/event';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-events-article',
  templateUrl: './events-article.component.html',
  styleUrls: ['./events-article.component.css']
})
export class EventsArticleComponent implements OnInit {
  @Input() currentEvent: IEvent;
  localhost = environment.localhost;
  frontEndUrl = environment.frontEndUrl;
  textContentLength = 250;
  eventUrl: string;
  language = document.documentElement.lang;

  constructor() {

  }


  ngOnInit(): void {
    this.currentEvent.text = this.currentEvent.text.length > this.textContentLength
      ? this.currentEvent.text.slice(0, this.textContentLength) + '[...]'
      : (this.currentEvent.text);
      
    this.currentEvent.createdOn = new Date(this.currentEvent?.createdOn);

    if (this.currentEvent.mainImageUrl === null) {
      this.eventUrl = '../../../assets/dafault-images/default-event.jpg';
    }
    else {
      this.eventUrl = this.localhost + this.currentEvent.mainImageUrl + '/' + this.currentEvent.imageFileName;
    }


  }

}

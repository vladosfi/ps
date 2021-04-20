import { Component, Input, OnInit } from '@angular/core';
import { IEvent } from 'src/app/shared/_interfaces/event';

@Component({
  selector: 'app-events-article',
  templateUrl: './events-article.component.html',
  styleUrls: ['./events-article.component.css']
})
export class EventsArticleComponent implements OnInit {
  @Input() currentEvent: IEvent;
  constructor() { }

  ngOnInit(): void {
  }

}

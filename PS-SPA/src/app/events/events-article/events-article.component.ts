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
  
  constructor() { 
    
  }
  

  ngOnInit(): void {
    this.currentEvent.text = this.currentEvent.text.length > this.textContentLength 
      ? this.currentEvent.text.slice(0,this.textContentLength) +'[...]' 
      : (this.currentEvent.text);      

      if(this.currentEvent.mainImageUrl === null){
        this.currentEvent.imageFileName = 'default-event.jpg';
        this.currentEvent.mainImageUrl = '../../../assets/dafault-images';
      }
      else{
        this.currentEvent.mainImageUrl = this.localhost + this.currentEvent.mainImageUrl;
      }
  }

}

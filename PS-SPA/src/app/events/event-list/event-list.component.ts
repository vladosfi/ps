import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IEvent } from 'src/app/shared/_interfaces/Event';
import { Pagination } from 'src/app/_interfaces/pagination';
import { ToastService } from 'src/app/_services/toast.service';
import { EventsService } from '../events.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  events: IEvent[];
  pagination: Pagination;

  constructor(private eventsService: EventsService,
    private toast: ToastService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.events = data['events'].result;
      this.pagination = data['events'].pagination;
    });

    this.toast.info(JSON.stringify(this.events));
  }

}

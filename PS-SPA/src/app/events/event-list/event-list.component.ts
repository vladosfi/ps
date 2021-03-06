import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IEvent } from 'src/app/shared/_interfaces/event';
import { PaginatedResult, Pagination } from 'src/app/_interfaces/pagination';
import { ToastService } from 'src/app/_services/toast.service';
import { EventService } from '../event.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  events: IEvent[];
  pagination: Pagination;
  currentLanguage = document.documentElement.lang;

  constructor(
    private route: ActivatedRoute, 
    private eventService: EventService,
    private toast: ToastService) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.events = data['events'].result;
      this.pagination = data['events'].pagination;
    });
  }

  // ngDoCheck(): void {
  //   if(this.currentLanguage != document.documentElement.lang){
  //     this.currentLanguage = document.documentElement.lang;
  //     this.loadEvents();
  //   }
  // }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadEvents();
    window.scroll(0,0);
  }

  loadEvents() {
    this.eventService.getEvents(this.pagination.currentPage, this.pagination.itemsPerPage)
      .subscribe((res: PaginatedResult<IEvent[]>) => {
        this.events = res.result;
        this.pagination = res.pagination;
      }, error => {
        this.toast.error(error);
      })
  }

}

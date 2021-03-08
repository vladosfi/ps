import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import { PaginatedResult, Pagination } from 'src/app/_interfaces/pagination';
import { IPainting } from 'src/app/_interfaces/painting';
import { PaintingService } from 'src/app/_services/painting.service';
import { ToastService } from 'src/app/_services/toast.service';

@Component({
  selector: 'app-painting-list',
  templateUrl: './painting-list.component.html',
  styleUrls: ['./painting-list.component.css']
})
export class PaintingListComponent implements OnInit, OnDestroy {
  paintings: IPainting[];
  paintingParams: any = {};
  pagination: Pagination;
  modalRef: BsModalRef;
  @ViewChild('template') modalTemplate : TemplateRef<any>;

  constructor(private paintingService: PaintingService,
    private toast: ToastService,
    private route: ActivatedRoute,
    private modalService: BsModalService) {
    document.body.style.backgroundColor = "#A9D3E9";
  }
  
  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.paintings = data['paintings'].result;
      this.pagination = data['paintings'].pagination;
    });

    //this.paintingParams.categoryId = 1;
  }

  getPainting(id: string) {
    this.paintingService.getPainting(id).subscribe(params => {
      this.toast.success(JSON.stringify(params));
      this.openModal(this.modalTemplate);
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  

  handler(type: string, $event: ModalDirective) {
    
    // this.messages.push(
    //   `event ${type} is fired${$event.dismissReason
    //     ? ', dismissed by ' + $event.dismissReason
    //     : ''}`
    // );
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadPaintings();
  }

  loadPaintings() {
    this.paintingService.getPaintings(this.pagination.currentPage, this.pagination.itemsPerPage)
      .subscribe((res: PaginatedResult<IPainting[]>) => {
        this.paintings = res.result;
        this.pagination = res.pagination;
      }, error => {
        this.toast.error(error);
      })
  }

  ngOnDestroy() {
    document.body.style.backgroundColor = "#ffffff";
  }
}
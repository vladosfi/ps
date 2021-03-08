import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PaginatedResult, Pagination } from 'src/app/_interfaces/pagination';
import { IPainting } from 'src/app/_interfaces/painting';
import { PaintingService } from 'src/app/_services/painting.service';
import { ToastService } from 'src/app/_services/toast.service';

@Component({
  selector: 'app-painting-list',
  templateUrl: './painting-list.component.html',
  styleUrls: ['./painting-list.component.css']
})
export class PaintingListComponent implements OnInit , OnDestroy {
  paintings: IPainting[];
  paintingParams: any = {};
  pagination: Pagination;
  modalRef: BsModalRef;
  bsModalRef: BsModalRef;

  constructor(private paintingService: PaintingService,
    private toast: ToastService,
    private route: ActivatedRoute,
    private modalService: BsModalService) {
      document.body.style.backgroundColor  = "#A9D3E9";
     }

    ngOnInit(): void {
      this.route.data.subscribe(data => {
        this.paintings = data['paintings'].result;
        this.pagination = data['paintings'].pagination;
      });
  
      //this.paintingParams.categoryId = 1;
    }

    openModalWithComponent() {
      const initialState = {
        list: [
          'Open a modal with component',
          'Pass your data',
          'Do something else',
          '...'
        ],
        title: 'Modal with component'
      };
      this.bsModalRef = this.modalService.show(ModalContentComponent, {initialState});
      this.bsModalRef.content.closeBtnName = 'Close TEST';
      this.bsModalRef.content.list = initialState;
    }

    // openModal(template: TemplateRef<any>) {
    //   this.modalRef = this.modalService.show(template);
    // }
  
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

    ngOnDestroy(){
      document.body.style.backgroundColor  = "#ffffff";
    }
}


/* This is a component which we pass in modal*/
 
@Component({
  selector: 'modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title pull-left">{{title}}</h4>
      <button type="button" class="close pull-right" aria-label="Close" (click)="bsModalRef.hide()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <ul *ngIf="list.length">
        <li *ngFor="let item of list">{{item}}</li>
      </ul>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-default" (click)="bsModalRef.hide()">{{closeBtnName}}</button>
    </div>
  `
})
 
export class ModalContentComponent implements OnInit {
  title: string;
  closeBtnName: string;
  list: any[] = [];
 
  constructor(public bsModalRef: BsModalRef) {}
 
  ngOnInit() {
    this.list.push("this.bsModalRef");
  }
}
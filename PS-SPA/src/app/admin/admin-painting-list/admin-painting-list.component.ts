import { Component, forwardRef, OnInit, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PaginatedResult, Pagination } from 'src/app/_interfaces/pagination';
import { IPainting } from 'src/app/_interfaces/painting';
import { PaintingService } from 'src/app/_services/painting.service';
import { ToastService } from 'src/app/_services/toast.service';

@Component({
  selector: 'app-admin-painting-list',
  templateUrl: './admin-painting-list.component.html',
  styleUrls: ['./admin-painting-list.component.css']
})
export class AdminPaintingListComponent implements OnInit {
  pagination: Pagination;
  paintings: IPainting[];
  paintingParams: any = {};


  constructor(private paintingService: PaintingService,
    private toast: ToastService,
    private route: ActivatedRoute) {

    document.body.style.backgroundColor = "#A9D3E9";

    this.route.data.subscribe(data => {
      this.paintings = data['paintings'].result;
      this.pagination = data['paintings'].pagination;
    });
  }

  ngOnInit(): void { }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadPaintings();
  }

  loadPaintings() {
    this.paintingService.getPaintings(this.pagination.currentPage, this.pagination.itemsPerPage, this.paintingParams)
      .subscribe((res: PaginatedResult<IPainting[]>) => {
        this.paintings = res.result;
        this.pagination = res.pagination;
      }, error => {
        this.toast.error(error);
      })
  }

  deleteItem(paintingId: string) {
    this.paintings.splice(this.paintings.findIndex((i) => i.id === paintingId), 1);
  }

  ngOnDestroy() {
    document.body.style.backgroundColor = "#ffffff";
  }

  search(){
    //this.paintingService.getPaintings(this.route.snapshot.params.name);
    // this.paintingParams.searchText;
    // console.log(this.paintingParams.searchText);
  }
}

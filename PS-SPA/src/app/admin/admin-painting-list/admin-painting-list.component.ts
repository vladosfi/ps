import { Component, OnInit } from '@angular/core';
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
     }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.paintings = data['paintings'].result;
      this.pagination = data['paintings'].pagination;
    });

    this.toast.success(this.paintings[0].description);
  }

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

  ngOnDestroy() {
    document.body.style.backgroundColor = "#ffffff";
  }

}

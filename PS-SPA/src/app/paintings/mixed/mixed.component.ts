import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaginatedResult, Pagination } from 'src/app/_interfaces/pagination';
import { IPainting } from 'src/app/_interfaces/painting';
import { PaintingService } from 'src/app/_services/painting.service';
import { ToastService } from 'src/app/_services/toast.service';

@Component({
  selector: 'app-mixed',
  templateUrl: './mixed.component.html',
  styleUrls: ['./mixed.component.css']
})
export class MixedComponent implements OnInit {
  paintings: IPainting[];
  userParams: any = {};
  pagination: Pagination;
  paintingSource: string = 'Name of image';

  constructor(private paintingService: PaintingService,
    private toast: ToastService,
    private route: ActivatedRoute) { }

    ngOnInit(): void {
      this.route.data.subscribe(data => {
        this.paintings = data['paintings'].result;
        this.pagination = data['paintings'].pagination;
      });
  
      this.userParams.categoryId = 1;
    }
  
    pageChanged(event: any): void {
      this.pagination.currentPage = event.page;
      this.loadPaintings();
    }
  
    loadPaintings() {
      this.paintingService.getPaintings(this.pagination.currentPage, this.pagination.itemsPerPage, this.userParams)
        .subscribe((res: PaginatedResult<IPainting[]>) => {
          this.paintings = res.result;
          this.pagination = res.pagination;
        }, error => {
          this.toast.error(error);
        })
    }
}

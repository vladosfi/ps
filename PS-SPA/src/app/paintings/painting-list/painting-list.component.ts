import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  
  constructor(private paintingService: PaintingService,
    private toast: ToastService,
    private route: ActivatedRoute) {
      document.body.style.backgroundColor  = "#A9D3E9";
     }

    ngOnInit(): void {
      this.route.data.subscribe(data => {
        this.paintings = data['paintings'].result;
        this.pagination = data['paintings'].pagination;
      });
  
      //this.paintingParams.categoryId = 1;
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

    ngOnDestroy(){
      document.body.style.backgroundColor  = "#ffffff";
    }
}

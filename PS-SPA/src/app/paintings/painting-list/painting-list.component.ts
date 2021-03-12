import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaginatedResult, Pagination } from 'src/app/_interfaces/pagination';
import { IPainting } from 'src/app/_interfaces/painting';
import { IPaintingDetails } from 'src/app/_interfaces/painting-details';
import { PaintingService } from 'src/app/_services/painting.service';
import { ToastService } from 'src/app/_services/toast.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-painting-list',
  templateUrl: './painting-list.component.html',
  styleUrls: ['./painting-list.component.css']
})
export class PaintingListComponent implements OnInit, OnDestroy {
  paintingModal: IPaintingDetails;
  paintings: IPainting[];
  paintingParams: any = {};
  pagination: Pagination;
  baseUrl = environment.serverUrl;
  categoryModel: any;
  @ViewChild('lgModal') lgModal;

  constructor(private paintingService: PaintingService,
    private toast: ToastService,
    private route: ActivatedRoute,) {
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
    this.paintingService.getPainting(id).subscribe(data => {
      this.paintingModal = data;

      const currentImageIndex = this.paintings.map(e => e.mainImageUrl).indexOf(this.paintingModal.imageUrl);

      if (currentImageIndex > 0) {
        this.paintingModal.pervImageUrl = this.paintings[currentImageIndex - 1].id;
      }

      if (currentImageIndex < this.paintings.length - 1) {
        this.paintingModal.nextImageUrl = this.paintings[currentImageIndex + 1].id;
      }
      
      this.paintingModal.imageUrl = this.baseUrl + this.paintingModal.imageUrl;
      this.lgModal.show();

      // this.toast.success(JSON.stringify(data));
    });
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
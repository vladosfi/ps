import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaginatedResult, Pagination } from 'src/app/_interfaces/pagination';
import { IPainting } from 'src/app/_interfaces/painting';
import { IPaintingDetails } from 'src/app/_interfaces/painting-details';
import { PaintingService } from 'src/app/_services/painting.service';
import { ToastService } from 'src/app/_services/toast.service';
import { environment } from 'src/environments/environment';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryImageSize, NgxGalleryOptions } from 'ngx-gallery-9';

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
  baseUrl = environment.localhost;
  categoryModel: any;
  @ViewChild('lgModal') lgModal;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

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

    this.galleryOptions = [{
      width: '100%',
      height: '800px',
      imageSize: NgxGalleryImageSize.Contain,
      imagePercent: 85,
      thumbnailsColumns: 4,
      thumbnailSize: NgxGalleryImageSize.Cover,
      thumbnailsPercent: 20,
      //thumbnailsAutoHide: true, 
      imageAnimation: NgxGalleryAnimation.Slide,
      preview: false,
    }];
  }

  getImages() {
    const imageUrls = [];
    for (let i = 0; i < this.paintingModal.images.length; i++) {

      let image = {
        small: this.baseUrl + this.paintingModal.images[i].url + '/' + this.paintingModal.images[i].imageFileName,
        medium: this.baseUrl + this.paintingModal.images[i].url + '/' + this.paintingModal.images[i].imageFileName,
        big: this.baseUrl + this.paintingModal.images[i].url + '/' + this.paintingModal.images[i].imageFileName,
        //description: this.paintingModal.images[i].description
      };

      if (image.small && image.medium && image.big) {
        imageUrls.push(image);
      }
    }
    return imageUrls;
  }


  getPainting(id: string) {
    const inchesFactor: number = 0.39370;

    this.paintingService.getPainting(id).subscribe(data => {
      this.paintingModal = data;
      this.galleryImages = this.getImages();

      const currentImageIndex = this.paintings.map(e => e.id).indexOf(this.paintingModal.id);
      this.paintingModal.sizeXIn = +(this.paintingModal.sizeX * inchesFactor).toFixed(1);
      this.paintingModal.sizeYIn = +(this.paintingModal.sizeY * inchesFactor).toFixed(1);;

      if (currentImageIndex > 0) {
        this.paintingModal.pervImageUrl = this.paintings[currentImageIndex - 1].id;
      }

      if (currentImageIndex < this.paintings.length - 1) {
        this.paintingModal.nextImageUrl = this.paintings[currentImageIndex + 1].id;
      }

      this.paintingModal.url = this.baseUrl + this.paintingModal.url;
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
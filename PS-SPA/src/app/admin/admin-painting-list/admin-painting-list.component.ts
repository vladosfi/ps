import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaginatedResult, Pagination } from 'src/app/_interfaces/pagination';
import { IPainting } from 'src/app/_interfaces/painting';
import { PaintingService } from 'src/app/_services/painting.service';
import { ToastService } from 'src/app/_services/toast.service';
import { debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { AdminService } from '../admin.service';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-admin-painting-list',
  templateUrl: './admin-painting-list.component.html',
  styleUrls: ['./admin-painting-list.component.css']
})
export class AdminPaintingListComponent implements OnInit, OnDestroy, AfterViewInit {
  // @ViewChild('filter', { static: false }) input: ElementRef;
  pagination: Pagination;
  paintings: IPainting[];
  paintingParams: any = {};
  searchControl: FormControl;
  private debounce: number = 400;

  // paintinsObservable$: Observable<PaginatedResult<IPainting[]>>;


  constructor(private paintingService: PaintingService,
    private toast: ToastService,
    private route: ActivatedRoute,
    private adminService: AdminService) {

    document.body.style.backgroundColor = "#A9D3E9";
    this.route.data.subscribe(data => {
      this.paintings = data['paintings'].result;
      this.pagination = data['paintings'].pagination;
    });
    console.log(this.paintings);
  }

  ngAfterViewInit(): void {

    // this.paintinsObservable$ = fromEvent(this.input.nativeElement, 'keyup')
    //   .pipe(
    //     //tap(console.log),
    //     debounceTime(300),
    //     distinctUntilChanged(),
    //     map((e: KeyboardEvent) => (e.target as HTMLInputElement).value),
    //     switchMap(query => {
    //         this.paintingParams.name = query;
    //         return this.paintingService.getPaintings(this.pagination.currentPage, this.pagination.itemsPerPage, this.paintingParams)
    //         //return this.adminService.searchPainting(`?name_like=${query}`)
    //     })
    //   );
  }

  ngOnInit(): void {

    this.searchControl = new FormControl('');
    this.searchControl.valueChanges
      .pipe(debounceTime(this.debounce), distinctUntilChanged())
      .subscribe(query => {
        this.paintingParams.name = query;
        this.loadPaintings();
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
      });
  }

  deleteItem(paintingId: string) {
    this.paintings.splice(this.paintings.findIndex((i) => i.id === paintingId), 1);
  }

  ngOnDestroy() {
    document.body.style.backgroundColor = "#ffffff";
  }

  search() {
    //this.paintingService.getPaintings(this.route.snapshot.params.name);
    // this.paintingParams.searchText;
    // console.log(this.paintingParams.searchText);
  }


}

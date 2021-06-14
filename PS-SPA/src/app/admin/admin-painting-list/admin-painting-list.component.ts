import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaginatedResult, Pagination } from 'src/app/_interfaces/pagination';
import { IPainting } from 'src/app/_interfaces/painting';
import { PaintingService } from 'src/app/_services/painting.service';
import { ToastService } from 'src/app/_services/toast.service';
import { debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { KeyValuePair } from 'src/app/_interfaces/key-value-pair';

@Component({
  selector: 'app-admin-painting-list',
  templateUrl: './admin-painting-list.component.html',
  styleUrls: ['./admin-painting-list.component.css'],
})
export class AdminPaintingListComponent implements OnInit, OnDestroy, AfterViewInit {
  // @ViewChild('filter', { static: false }) input: ElementRef;
  pagination: Pagination;
  paintings: IPainting[];
  paintingParams: any = {};
  searchControl: FormControl;
  private debounce: number = 400;
  orderChangeCounter = 0;
  lastEvent: string[] = [];
  kvp: KeyValuePair<number, number>[] = [];

  // paintinsObservable$: Observable<PaginatedResult<IPainting[]>>;


  constructor(private paintingService: PaintingService,
    private toast: ToastService,
    private route: ActivatedRoute,) {

    document.body.style.backgroundColor = "#A9D3E9";
    this.route.data.subscribe(data => {
      this.paintings = data['paintings'].result;
      this.pagination = data['paintings'].pagination;
    });
    this.setInitialOrder();
  }

  dropItem($event) {
    //console.log($event);

    for (let index = 0; index < this.paintings.length; index++) {
      this.paintings[index].position = this.kvp[index].value;
      //console.log(index + '-' + this.paintings[index].position)
    }

    this.paintingService.updatePaintingPosition(this.paintings).subscribe(next => {
      this.toast.success('Painting updated successfully');
    }, error => {
      this.toast.error(error);
    });
  }

  onChange($event) {
    // zapazvane na promenite pozicii
    if ($event.length > 0 && !this.lastEvent.every((x, idx) => x === $event[idx])) {
      this.orderChangeCounter++;
    }
    this.lastEvent = $event.map(x => x);
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

  setInitialOrder() {
    this.kvp = this.kvp.filter(item => item !== item);
    console.log(this.kvp);

    for (let index = 0; index < this.paintings.length; index++) {
      this.kvp.push({ key: index, value: this.paintings[index].position });
    }

    for (let index = 0; index < this.paintings.length; index++) {
      console.log(this.kvp[index].key + ' - ' + this.kvp[index].value);
      console.log(this.paintings[index].position);
    }
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadPaintings();
    window.scroll(0,0);
  }

  loadPaintings() {
    this.paintingService.getPaintings(this.pagination.currentPage, this.pagination.itemsPerPage, this.paintingParams)
      .subscribe((res: PaginatedResult<IPainting[]>) => {
        this.paintings = res.result;
        this.pagination = res.pagination;

        this.setInitialOrder();
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



}

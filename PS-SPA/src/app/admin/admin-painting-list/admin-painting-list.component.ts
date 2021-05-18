import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { PaginatedResult, Pagination } from 'src/app/_interfaces/pagination';
import { IPainting } from 'src/app/_interfaces/painting';
import { PaintingService } from 'src/app/_services/painting.service';
import { ToastService } from 'src/app/_services/toast.service';
import { AdminService } from '../admin.service';
import { debounceTime, distinctUntilChanged, map, startWith, switchMap } from 'rxjs/operators';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-admin-painting-list',
  templateUrl: './admin-painting-list.component.html',
  styleUrls: ['./admin-painting-list.component.css']
})
export class AdminPaintingListComponent implements OnInit, OnDestroy {
  // @ViewChild('filter', { static: true }) searchInput: ElementRef;
  pagination: Pagination;
  paintings: IPainting[];
  paintingParams: any = {};
  users$: Observable<any[]>;
  


  constructor(private paintingService: PaintingService,
    private toast: ToastService,
    private route: ActivatedRoute,
    private adminService: AdminService) {

    document.body.style.backgroundColor = "#A9D3E9";

    this.route.data.subscribe(data => {
      this.paintings = data['paintings'].result;
      this.pagination = data['paintings'].pagination;
    });
  }

  ngOnInit(): void {
    // this.users$ = fromEvent<KeyboardEvent>(this.searchInput.nativeElement, 'keyup').pipe(
    //   map(e => (e.target as HTMLInputElement).value),
    //   startWith(''),
    //   debounceTime(300),
    //   distinctUntilChanged(),
    //   switchMap((inputValue: string) => {
    //     if (inputValue) {
    //       console.log(this.searchInput);
    //       return this.adminService.searchPainting(`?name_like=${inputValue}`)
    //     }
    //   })
    // );
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
      console.log(this.paintingParams);
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


  isValidFormSubmitted = false;
	user: any = {};
	
	onFormSubmit(form: NgForm) {
	   this.isValidFormSubmitted = false;
	   if(form.invalid){
		  return;	
	   } 	
	   this.isValidFormSubmitted = true;
	   this.user.userName = form.controls['uname'].value;
	   this.user.gender = form.controls['gender'].value;
	   this.user.isMarried = form.controls['married'].value;
	   this.user.isTCAccepted = form.controls['tc'].value;
	   this.resetForm(form);
	}
	resetForm(form: NgForm) {;	
	   form.resetForm({
		   married: false
	   }); 
	}
	setDefaultValues() {
	   this.user.userName = 'Krishna';
	   this.user.gender = 'male';
	   this.user.isMarried = true;
	   this.user.isTCAccepted = false;
	}
}

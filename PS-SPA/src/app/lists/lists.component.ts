import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaginatedResult, Pagination } from '../_interfaces/pagination';
import { IUser } from '../_interfaces/user';
import { AuthService } from '../_services/auth.service';
import { ToastService } from '../_services/toast.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  users: IUser[];
  pagination: Pagination;
  likesParam: string;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private route: ActivatedRoute,
    private toast: ToastService) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.users = data['users'].result;
      this.pagination = data['users'].pagination;
    })

    this.likesParam = 'Likers';
  }

  loadUsers() {
    this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, null, this.likesParam)
      .subscribe((res: PaginatedResult<IUser[]>) => {
        this.users = res.result;
        this.pagination = res.pagination;
      }, error => {
        this.toast.error(error);
      })
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

}

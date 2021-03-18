import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IPainting } from 'src/app/_interfaces/painting';
import { environment } from 'src/environments/environment';
import { AdminModalService } from '../_service/admin-modal.service';

@Component({
  selector: 'app-admin-painting-list-thumb',
  templateUrl: './admin-painting-list-thumb.component.html',
  styleUrls: ['./admin-painting-list-thumb.component.css']
})
export class AdminPaintingListThumbComponent implements OnInit {
  @Input() paintingDetails: IPainting;
  localhost = environment.localhost;

  modalRef: BsModalRef;

  constructor(private adminModalService: AdminModalService) { }

  ngOnInit() {

  }

  show() {
    this.adminModalService.showYourModal();
  }

}
import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IPainting } from 'src/app/_interfaces/painting';
import { environment } from 'src/environments/environment';
import { AdminConfirmModalComponent } from '../admin-confirm-modal/admin-confirm-modal.component';

@Component({
  selector: 'app-admin-painting-list-thumb',
  templateUrl: './admin-painting-list-thumb.component.html',
  styleUrls: ['./admin-painting-list-thumb.component.css']
})
export class AdminPaintingListThumbComponent implements OnInit {
  @Input() paintingDetails: IPainting;
  localhost = environment.localhost;
 
  modalRef: BsModalRef;
 
  constructor(private modalService: BsModalService) { }
 
  ngOnInit() {
  }
 
  deleteRecord(recordId: string){
 
    this.modalRef = this.modalService.show(AdminConfirmModalComponent, {
      initialState: {
        prompt: 'Are you sure you want to delete this record?',
         callback: (result) => {
           if (result == 'yes'){
             //pass recordId here
           }
         }
      }
    });
  }
}
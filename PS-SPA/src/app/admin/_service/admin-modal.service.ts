
import { Component } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
    selector: 'demo-modal-service-component',
    templateUrl: '../admin-confirm-modal/admin-confirm-modal.component.html'
})
export class AdminModalService {
  bsModalRef: BsModalRef;
  constructor(private modalService: BsModalService) {}

  showYourModal() {
      const initialState = {
          parameter: 2019,
      };
      this.bsModalRef = this.modalService.show('AdminPaintingListThumbComponent', {initialState});
      this.bsModalRef.content.closeBtnName = 'Close';
  }
}
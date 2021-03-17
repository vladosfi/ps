import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Injectable({
  providedIn: 'root'
})
export class AdminModalService {

  bsModalRef: BsModalRef;
  constructor(private modalService: BsModalService) {}

  showYourModal() {
      const initialState = {
          parameter: 2019,
      };

      this.bsModalRef = this.modalService.show(AdminModalService);
      this.bsModalRef.content.closeBtnName = 'Close';
  }
}

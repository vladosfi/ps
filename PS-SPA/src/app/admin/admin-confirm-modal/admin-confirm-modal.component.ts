import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  // templateUrl: './admin-confirm-modal.component.html',
  // styleUrls: ['./admin-confirm-modal.component.css']  
  selector: 'app-admin-confirm-modal',
  //selector: 'app-confirm-modal',
  template: `<div class="modal-body text-center">
                <p>{{prompt}}</p>
                <button type="button" class="btn btn-primary" (click)="confirm()" >Yes</button>
                <button type="button" class="btn btn-primary" (click)="decline()" >No</button>
              </div>`
})
export class AdminConfirmModalComponent implements OnInit {
  prompt: {};
  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

  confirm() {
    if (this.bsModalRef.content.callback != null) {
      this.bsModalRef.content.callback('yes');
      this.bsModalRef.hide();
    }
  }

  decline() {
    if (this.bsModalRef.content.callback != null) {
      this.bsModalRef.content.callback('no');
      this.bsModalRef.hide();
    }
  }
}
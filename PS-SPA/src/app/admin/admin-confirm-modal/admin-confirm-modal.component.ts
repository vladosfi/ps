
import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-admin-confirm-modal',
  // selector: 'app-admin-confirm-modal',
  templateUrl: './admin-confirm-modal.component.html',
})

export class AdminConfirmModalComponent implements OnInit {
  parameter: number;
  constructor(
    private bsModalRef: BsModalRef,
  ) {
  }

  ngOnInit() {

  }

  confirm() {
    // do stuff
    this.close();
  }

  close() {
    this.bsModalRef.hide();
  }
}
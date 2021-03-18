import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  templateUrl: './admin-confirm-modal.component.html',
  styleUrls: ['./admin-confirm-modal.component.css'],
  selector: 'app-admin-confirm-modal'
})
export class AdminConfirmModalComponent implements OnInit {
  parameter: number;
  constructor(
    private bsModalRef: BsModalRef
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

import { Component, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'modal-window',
    template:`<ng-template #modalWindow>
    <div class="modal-body text-center">
      <p>Do you want to confirm?</p>
      <button type="button" class="btn btn-default" (click)="confirm()" >Yes</button>
      <button type="button" class="btn btn-primary" (click)="decline()" >No</button>
    </div>
  </ng-template>`
})
export class ModalWindowService {
  modalRef: BsModalRef;
  message: string;
  // @ViewChild("modalWindow", { static: true }) template: TemplateRef<any>;

  constructor(private modalService: BsModalService) { }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(): void {
    this.message = 'Confirmed!';
    this.modalRef.hide();
  }

  decline(): void {
    this.message = 'Declined!';
    this.modalRef.hide();
  }
}
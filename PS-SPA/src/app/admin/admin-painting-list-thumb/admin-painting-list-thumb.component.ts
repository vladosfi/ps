import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { ModalWindowService } from 'src/app/shared/_service/modal-window.service';
import { IPainting } from 'src/app/_interfaces/painting';
import { PaintingService } from 'src/app/_services/painting.service';
import { ToastService } from 'src/app/_services/toast.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-painting-list-thumb',
  templateUrl: './admin-painting-list-thumb.component.html',
  styleUrls: ['./admin-painting-list-thumb.component.css']
})
export class AdminPaintingListThumbComponent implements OnInit {
  localhost = environment.localhost;
  @Input() paintingDetails: IPainting;
  @Output() deletePaintingEvent = new EventEmitter<string>();
  @ViewChild("template") template: TemplateRef<any>;
  textMessage: string = "Are you sure you want to delete?";

  constructor(
    private modalService: ModalWindowService,
    private paintingService: PaintingService,
    private toast: ToastService) { }

  ngOnInit() { }

  openConfirmModal() {
    this.modalService.openModal(this.template);
  }

  confirm() {
    this.modalService.confirm();

    this.paintingService.deletePainting(this.paintingDetails.id)
      .subscribe(
        () => {
          this.deletePaintingEvent.emit(this.paintingDetails.id);
          this.toast.success('Painting has been deleted');
        },
        (error) => {
          this.toast.error('Failed to delete painting');
    });
  }

  decline() {
    this.modalService.decline();
  }

}
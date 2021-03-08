import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IPaintingDetails } from 'src/app/_interfaces/painting-details';
import { PaintingService } from 'src/app/_services/painting.service';
import { ToastService } from 'src/app/_services/toast.service';


import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class PaintingDetailsComponent implements OnInit {
  modalRef: BsModalRef;
  painting: IPaintingDetails;

  constructor(private paintingService: PaintingService,
    private toast: ToastService,
    private route: ActivatedRoute,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    this.route.data.subscribe(params => {
      this.toast.success(JSON.stringify(params));
    });
  }
  
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }


}

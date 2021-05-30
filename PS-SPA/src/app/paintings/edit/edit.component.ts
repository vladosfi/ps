import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IPaintingDetails } from 'src/app/_interfaces/painting-details';
import { PaintingService } from 'src/app/_services/painting.service';
import { ToastService } from 'src/app/_services/toast.service';


import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class PaintingEditComponent implements OnInit {
  paintingModel: FormGroup;
  paintingDetails: IPaintingDetails;
  nameMinLen: number = 2;
  nameMaxLen: number = 50;
  descriptionMinLen: number = 10;
  descriptionMaxLen: number = 200;

  constructor(private paintingService: PaintingService,
    private toast: ToastService,
    private route: ActivatedRoute,
    fb: FormBuilder) {
    this.paintingModel = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(this.nameMinLen), Validators.maxLength(this.nameMaxLen)]),
      description: new FormControl('', [Validators.required, Validators.minLength(this.descriptionMinLen), Validators.maxLength(this.descriptionMaxLen)]),
      nameGb: new FormControl('', [Validators.required, Validators.minLength(this.nameMinLen), Validators.maxLength(this.nameMaxLen)]),
      descriptionGb: new FormControl('', [Validators.required, Validators.minLength(this.descriptionMinLen), Validators.maxLength(this.descriptionMaxLen)]),
      nameDe: new FormControl('', [Validators.required, Validators.minLength(this.nameMinLen), Validators.maxLength(this.nameMaxLen)]),
      descriptionDe: new FormControl('', [Validators.required, Validators.minLength(this.descriptionMinLen), Validators.maxLength(this.descriptionMaxLen)]),
      nameRu: new FormControl('', [Validators.required, Validators.minLength(this.nameMinLen), Validators.maxLength(this.nameMaxLen)]),
      descriptionRu: new FormControl('', [Validators.required, Validators.minLength(this.descriptionMinLen), Validators.maxLength(this.descriptionMaxLen)]),
      available: new FormControl('', [Validators.required]),
      categoryId: new FormControl('', [Validators.required]),
      sizeX: new FormControl('', [Validators.required]),
      sizeY: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.paintingDetails = data['painting'];
      this.paintingModel.controls['name'].setValue(this.paintingDetails.name);
      this.paintingModel.controls['description'].setValue(this.paintingDetails.description);
      this.paintingModel.controls['nameGb'].setValue(this.paintingDetails.nameGb);
      this.paintingModel.controls['descriptionGb'].setValue(this.paintingDetails.descriptionGb);
      this.paintingModel.controls['nameDe'].setValue(this.paintingDetails.nameDe);
      this.paintingModel.controls['descriptionDe'].setValue(this.paintingDetails.descriptionDe);
      this.paintingModel.controls['nameRu'].setValue(this.paintingDetails.nameRu);
      this.paintingModel.controls['descriptionRu'].setValue(this.paintingDetails.descriptionRu);
      this.paintingModel.controls['categoryId'].setValue(this.paintingDetails.categoryId);
      this.paintingModel.controls['available'].setValue(this.paintingDetails.available ? 'true' : 'false');
      this.paintingModel.controls['sizeX'].setValue(this.paintingDetails.sizeX);
      this.paintingModel.controls['sizeY'].setValue(this.paintingDetails.sizeY);
    });
  }

  updatePainting() {
    if (this.paintingModel.valid) {
      var updatedPainting = Object.assign({}, this.paintingModel.value);
      this.paintingService.updatePainting(this.paintingDetails.id, updatedPainting).subscribe(next => {
        this.toast.success('Painting updated successfully');
      }, error => {
        this.toast.error(error);
      });
    }
  }

}

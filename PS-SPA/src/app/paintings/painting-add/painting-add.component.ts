import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IPaintingDetails } from 'src/app/_interfaces/painting-details';
import { PaintingService } from 'src/app/_services/painting.service';
import { ToastService } from 'src/app/_services/toast.service';

@Component({
  selector: 'app-painting-add',
  templateUrl: './painting-add.component.html',
  styleUrls: ['./painting-add.component.css']
})
export class PaintingAddComponent implements OnInit {
  paintingModel: FormGroup;
  model: any = {};
  paintingDetails: IPaintingDetails;
  nameMinLen: number = 2;
  nameMaxLen: number = 30;
  descriptionMinLen: number = 10;
  descriptionMaxLen: number = 500;

  constructor(
    private paintingService: PaintingService,
    fb: FormBuilder,
    private toast: ToastService,) {

    this.paintingModel = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(this.nameMinLen), Validators.maxLength(this.nameMaxLen)]),
      description: new FormControl('', [Validators.required, Validators.minLength(this.descriptionMinLen), Validators.maxLength(this.descriptionMaxLen)]),
      nameGb: new FormControl('', [Validators.required, Validators.minLength(this.nameMinLen), Validators.maxLength(this.nameMaxLen)]),
      descriptionGb: new FormControl('', [Validators.required, Validators.minLength(this.descriptionMinLen), Validators.maxLength(this.descriptionMaxLen)]),
      nameDe: new FormControl('', [Validators.required, Validators.minLength(this.nameMinLen), Validators.maxLength(this.nameMaxLen)]),
      descriptionDe: new FormControl('', [Validators.required, Validators.minLength(this.descriptionMinLen), Validators.maxLength(this.descriptionMaxLen)]),
      nameRu: new FormControl('', [Validators.required, Validators.minLength(this.nameMinLen), Validators.maxLength(this.nameMaxLen)]),
      descriptionRu: new FormControl('', [Validators.required, Validators.minLength(this.descriptionMinLen), Validators.maxLength(this.descriptionMaxLen)]),

      //available: new FormControl('true', [Validators.required]),
      //categoryId: new FormControl(1, [Validators.required]),
      available: new FormControl('', [Validators.required]),
      categoryId: new FormControl('', [Validators.required]),
      sizeX: new FormControl('3', [Validators.required]),
      sizeY: new FormControl('4', [Validators.required]),
    });
  }

  ngOnInit(): void {

  }

  addPainting() {
    if (this.paintingModel.valid) {
      this.paintingDetails = Object.assign({}, this.paintingModel.value);
      this.paintingService.addPainting(this.paintingDetails).subscribe(
        (response) => {
          if (response) {
            this.paintingDetails = Object.assign({}, response);
            this.toast.success('Painting added successfully');
          }
        },
        (error) => {
          this.toast.error(error);
        }
      );
    }
  }
}


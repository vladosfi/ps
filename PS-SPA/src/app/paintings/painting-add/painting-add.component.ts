import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  
  constructor(
    private paintingService: PaintingService, 
    fb: FormBuilder, 
    private toast: ToastService,
    private route: ActivatedRoute,) {
    this.paintingModel = new FormGroup({
      name: new FormControl('nameBg', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      description: new FormControl('descBgdescBgdescBg', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]),
      available: new FormControl(true, [Validators.required]),
      categoryId: new FormControl(1, [Validators.required]),
      sizeX: new FormControl('3', [Validators.required]),
      sizeY: new FormControl('4', [Validators.required]),
    });

    //  fb.group({
    //   nameBg:['Name in BG', [Validators.required]],
    //   descBg:['', [Validators.required]],
    //   available:['', [Validators.required]],
    //   category:['Category', [Validators.required]],
    // });
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
        }},
        (error) => {
          this.toast.error(error);
        }
      );
    }
  }
}


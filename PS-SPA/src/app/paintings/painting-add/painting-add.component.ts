import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-painting-add',
  templateUrl: './painting-add.component.html',
  styleUrls: ['./painting-add.component.css']
})
export class PaintingAddComponent implements OnInit {
  paintingForm: FormGroup;
  model: any = {};

  constructor(fb: FormBuilder) {
    this.paintingForm = new FormGroup({
      nameBg: new FormControl('',[Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      //descBg: new FormControl('',[Validators.required, Validators.minLength(4), Validators.maxLength(200)]),
      available: new FormControl('',[Validators.required]),
      category: new FormControl('',[Validators.required]),
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

  addPainting(){
    console.log(this.paintingForm);
  }

}

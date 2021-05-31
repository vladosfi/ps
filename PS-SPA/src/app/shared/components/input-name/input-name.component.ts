import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-name',
  templateUrl: './input-name.component.html',
  styleUrls: ['./input-name.component.css']
})
export class InputNameComponent implements OnInit {
  @Input() parentForm: FormGroup;
  @Input() inputName: string;
  
  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { AbstractControl, FormControl, FormGroup } from "@angular/forms";
import { Validators, Editor, Toolbar } from "ngx-editor";

import jsonDoc from "./doc";


@Component({
  selector: 'app-events-edit',
  templateUrl: './events-edit.component.html',
  styleUrls: ['./events-edit.component.css']
})
export class EventsEditComponent implements OnInit, OnDestroy {
  editor: Editor;
  html: '';
  eventModel: FormGroup;


  ngOnInit(): void {
    this.editor = new Editor();

    this.eventModel = new FormGroup({
      name: new FormControl('', [Validators.required(), Validators.minLength(2), Validators.maxLength(50)]),
      description: new FormControl('', [Validators.required(), Validators.minLength(10), Validators.maxLength(200)]),
      editorContent: new FormControl(null, [Validators.required(),Validators.minLength(10)]),
    });
  }

  addEvent(){

  }

  // make sure to destory the editor
  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
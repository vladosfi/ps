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

  ngOnInit(): void {
    this.editor = new Editor();
  }

  // make sure to destory the editor
  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
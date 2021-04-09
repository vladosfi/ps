import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { Validators as FormValidators, FormControl, FormGroup } from "@angular/forms";
import { Validators, Editor, Toolbar } from "ngx-editor";

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit, OnDestroy {
  editor: Editor;
  html: '';
  eventModel: FormGroup;


  ngOnInit(): void {
    this.editor = new Editor();

    this.eventModel = new FormGroup({
      name: new FormControl('', [FormValidators.required, FormValidators.minLength(2), Validators.maxLength(50)]),
      editorContent: new FormControl('', [Validators.required(),Validators.minLength(50)]),
      // description: new FormControl('', [FormValidators.required, FormValidators.minLength(10), FormValidators.maxLength(200)]),
      //https://joshblf.medium.com/using-child-components-in-angular-forms-d44e60036664
    });
  }
  
  // make sure to destory the editor
  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
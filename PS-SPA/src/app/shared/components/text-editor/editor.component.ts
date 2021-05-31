import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Editor } from "ngx-editor";

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit, OnDestroy {
  editor: Editor;
  html: '';
  @Input() parentForm: FormGroup;
  @Input() conrolName: String;


  ngOnInit(): void {
    this.editor = new Editor();
    //this.editorGb = new Editor();
    // this.eventModel = new FormGroup({
        //name: new FormControl('', [FormValidators.required, FormValidators.minLength(2), Validators.maxLength(50)]),
    //    text: new FormControl('', [Validators.required(),Validators.minLength(50)]),
    //   // description: new FormControl('', [FormValidators.required, FormValidators.minLength(10), FormValidators.maxLength(200)]),
    //   //https://joshblf.medium.com/using-child-components-in-angular-forms-d44e60036664
     //});
  }

  //   keyPress(event: KeyboardEvent) {
  //     console.log(this.html);
  //     event.preventDefault();
  // }

  // make sure to destory the editor
  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
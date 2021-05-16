import { Component, OnDestroy, OnInit } from "@angular/core";
import { Validators as FormValidators, FormControl, FormGroup } from "@angular/forms";
import { Validators, Editor, Toolbar } from "ngx-editor";
import { IEvent } from "src/app/shared/_interfaces/event";
import { ToastService } from "src/app/_services/toast.service";
import { EventService } from "../event.service";


@Component({
  selector: 'app-events-add',
  templateUrl: './events-add.component.html',
  styleUrls: ['./events-add.component.css']
})
export class EventsAddComponent implements OnInit, OnDestroy {
  editor: Editor;
  html: string = '';
  parentForm: FormGroup;
  event: IEvent;

  constructor(
    private toast: ToastService,
    private eventService: EventService ) {

    }
  ngOnInit(): void {
    this.editor = new Editor();

    this.parentForm = new FormGroup({
      name: new FormControl('', [FormValidators.required, FormValidators.minLength(5), Validators.maxLength(50)]),
      text: new FormControl('', [Validators.required(),Validators.minLength(300)]),
      // description: new FormControl('', [FormValidators.required, FormValidators.minLength(10), FormValidators.maxLength(200)]),
    });
  }

  addEvent(){
    if (this.parentForm.valid) {
      //this.html = this.parentForm.get("editorContent")?.value;
      this.event = Object.assign({}, this.parentForm.value);
      this.eventService.addEvent(this.event).subscribe(
        (response) => {       
          if (response) {
            this.event = Object.assign({}, response);            
            this.toast.success('Event added successfully');
        }},
        (error) => {
          this.toast.error(error);
        }
      );
    }

    //console.log(this.parentForm.get("editorContent")?.value);
  }

  // make sure to destory the editor
  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
import { Component, OnInit } from "@angular/core";
import { Validators as FormValidators, FormControl, FormGroup } from "@angular/forms";
import { Validators } from "ngx-editor";
import { IEvent } from "src/app/shared/_interfaces/event";
import { ToastService } from "src/app/_services/toast.service";
import { EventService } from "../event.service";


@Component({
  selector: 'app-events-add',
  templateUrl: './events-add.component.html',
  styleUrls: ['./events-add.component.css']
})
export class EventsAddComponent implements OnInit {
  html: string = '';
  parentForm: FormGroup;

  event: IEvent;
  nameMinLen: number = 5;
  nameMaxLen: number = 50;
  textMinLen: number = 300;

  constructor(
    private toast: ToastService,
    private eventService: EventService) {

  }
  ngOnInit(): void {

    this.parentForm = new FormGroup({
      name: new FormControl('', [FormValidators.required, FormValidators.minLength(this.nameMinLen), Validators.maxLength(this.nameMaxLen)]),
      text: new FormControl('', [Validators.required(), Validators.minLength(this.textMinLen)]),
      nameGb: new FormControl('', [FormValidators.required, FormValidators.minLength(this.nameMinLen), Validators.maxLength(this.nameMaxLen)]),
      textGb: new FormControl('', [Validators.required(), Validators.minLength(this.textMinLen)]),
      nameDe: new FormControl('', [FormValidators.required, FormValidators.minLength(this.nameMinLen), Validators.maxLength(this.nameMaxLen)]),
      textDe: new FormControl('', [Validators.required(), Validators.minLength(this.textMinLen)]),
      nameRu: new FormControl('', [FormValidators.required, FormValidators.minLength(this.nameMinLen), Validators.maxLength(this.nameMaxLen)]),
      textRu: new FormControl('', [Validators.required(), Validators.minLength(this.textMinLen)]),
      //description: new FormControl('', [FormValidators.required, FormValidators.minLength(10), FormValidators.maxLength(200)]),
    });
  }

  addEvent() {
    if (this.parentForm.valid) {
      //this.html = this.parentForm.get("editorContent")?.value;
      this.event = Object.assign({}, this.parentForm.value);
      this.eventService.addEvent(this.event).subscribe(
        (response) => {
          if (response) {
            this.event = Object.assign({}, response);
            this.toast.success('Event added successfully');
          }
        },
        (error) => {
          this.toast.error(error);
        }
      );
    }

    //console.log(this.parentForm.get("editorContent")?.value);
  }

}
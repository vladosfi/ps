import { Component, OnInit } from "@angular/core";
import { Validators as FormValidators, FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';
import { Validators, Editor, Toolbar } from "ngx-editor";
import { IEvent } from "src/app/shared/_interfaces/event";
import { ToastService } from 'src/app/_services/toast.service';
import { EventService } from '../event.service';

@Component({
  selector: 'app-events-edit',
  templateUrl: './events-edit.component.html',
  styleUrls: ['./events-edit.component.css']
})
export class EventsEditComponent implements OnInit {
  html: string = '';
  parentForm: FormGroup;
  currentEvent: IEvent;
  nameMinLen: number = 5;
  nameMaxLen: number = 50;
  textMinLen: number = 300;

  constructor(private route: ActivatedRoute,
    private eventService: EventService,
    private toast: ToastService) { }


  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.currentEvent = Object.assign({}, data.events);
    });

    const eventDate = new Date(this.currentEvent.eventDate);

    this.parentForm = new FormGroup({
      eventDate: new FormControl(eventDate, [FormValidators.required]),
      name: new FormControl(this.currentEvent.name, [FormValidators.required, FormValidators.minLength(this.nameMinLen), Validators.maxLength(this.nameMaxLen)]),
      text: new FormControl(this.currentEvent.text, [Validators.required(), Validators.minLength(this.textMinLen)]),
      nameGb: new FormControl(this.currentEvent.nameGb, [FormValidators.required, FormValidators.minLength(this.nameMinLen), Validators.maxLength(this.nameMaxLen)]),
      textGb: new FormControl(this.currentEvent.textGb, [Validators.required(), Validators.minLength(this.textMinLen)]),
      nameDe: new FormControl(this.currentEvent.nameDe, [FormValidators.required, FormValidators.minLength(this.nameMinLen), Validators.maxLength(this.nameMaxLen)]),
      textDe: new FormControl(this.currentEvent.textDe, [Validators.required(), Validators.minLength(this.textMinLen)]),
      nameRu: new FormControl(this.currentEvent.nameRu, [FormValidators.required, FormValidators.minLength(this.nameMinLen), Validators.maxLength(this.nameMaxLen)]),
      textRu: new FormControl(this.currentEvent.textRu, [Validators.required(), Validators.minLength(this.textMinLen)])
    });


  }

  editEvent() {
    if (this.parentForm.valid) {
      //this.html = this.parentForm.get("editorContent")?.value;
      this.currentEvent = Object.assign(this.currentEvent, this.parentForm.value);
      this.eventService.updateEvent(this.currentEvent).subscribe(
        (response) => {
          if (response === null) {
            //this.event = Object.assign({}, response);
            this.toast.success('Event added successfully');
            this.parentForm.reset(this.currentEvent);
            // this.router.navigate(['/events/' + this.currentEvent.id]);            
          }
        },
        (error) => {
          this.toast.error(error);
        }
      );
    }
    else {
      this.toast.warning('Invalid form data!');
    }
  }
}
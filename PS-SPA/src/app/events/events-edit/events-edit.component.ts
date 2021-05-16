import { Component, HostListener, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Validators as FormValidators, FormControl, FormGroup, NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { Validators, Editor, Toolbar } from "ngx-editor";
import { IEvent } from "src/app/shared/_interfaces/event";
import { ToastService } from 'src/app/_services/toast.service';
import { EventService } from '../event.service';

@Component({
  selector: 'app-events-edit',
  templateUrl: './events-edit.component.html',
  styleUrls: ['./events-edit.component.css']
})
export class EventsEditComponent implements OnInit, OnDestroy {
  @ViewChild('editForm') editForm: NgForm;
  editor: Editor;
  html: string = '';
  parentForm: FormGroup;
  currentEvent: IEvent;
  @HostListener('window:beforeunload', ['$event'])
    uloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private route: ActivatedRoute,
    private eventService: EventService,
    private toast: ToastService) { }


  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.currentEvent = Object.assign({}, data.events);
      console.log(this.currentEvent);
    });
    
    this.editor = new Editor();

    this.parentForm = new FormGroup({
      name: new FormControl(this.currentEvent.name, [FormValidators.required, FormValidators.minLength(2), Validators.maxLength(50)]),
      text: new FormControl(this.currentEvent.text, [Validators.required(), Validators.minLength(300)]),
      // description: new FormControl('', [FormValidators.required, FormValidators.minLength(10), FormValidators.maxLength(200)]),
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
            this.editForm.reset(this.currentEvent);
            // this.router.navigate(['/events/' + this.currentEvent.id]);            
          }
        },
        (error) => {
          this.toast.error(error);
        }
      );
    }
  }

  // make sure to destory the editor
  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
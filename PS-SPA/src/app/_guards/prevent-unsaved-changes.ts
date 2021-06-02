import { Injectable } from "@angular/core";
import { CanDeactivate } from "@angular/router";
import { EventsEditComponent } from "../events/events-edit/events-edit.component";
import { DetailEditComponent } from "../members/detail-edit/detail-edit.component";

@Injectable()
export class PreventUnsavedChanges implements CanDeactivate<DetailEditComponent>{
    canDeactivate(component: DetailEditComponent){
        if(component.editForm.dirty){
            return confirm('Are you shure you want to continue? Any unsaved changes will be lost!');
        }

        return true;
    }
}

export class PreventUnsavedChangesForEvents implements CanDeactivate<EventsEditComponent>{
    canDeactivate(component: EventsEditComponent){
        if(component.parentForm.dirty){
            return confirm('Are you shure you want to continue? Any unsaved changes will be lost!');
        }

        return true;
    }
}

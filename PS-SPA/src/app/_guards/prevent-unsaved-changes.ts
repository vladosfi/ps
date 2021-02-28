import { Injectable } from "@angular/core";
import { CanDeactivate } from "@angular/router";
import { DetailEditComponent } from "../gallery/detail-edit/gallery-detail-edit.component";

@Injectable()
export class PreventUnsavedChanges implements CanDeactivate<DetailEditComponent>{
    canDeactivate(component: DetailEditComponent){
        if(component.editForm.dirty){
            return confirm('Are you shure you want to continue? Any unsaved changes will be lost!');
        }

        return true;
    }
}

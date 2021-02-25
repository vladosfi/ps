import { Injectable } from "@angular/core";
import { CanDeactivate } from "@angular/router";
import { GalleryDetailEditComponent } from "../gallery/gallery-detail-edit/gallery-detail-edit.component";

@Injectable()
export class PreventUnsavedChanges implements CanDeactivate<GalleryDetailEditComponent>{
    canDeactivate(component: GalleryDetailEditComponent){
        if(component.editForm.dirty){
            return confirm('Are you shure you want to continue? Any unsaved changes will be lost');
        }

        return true;
    }
}

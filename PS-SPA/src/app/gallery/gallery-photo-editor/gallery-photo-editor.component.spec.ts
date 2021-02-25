import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryPhotoEditorComponent } from './gallery-photo-editor.component';

describe('GalleryPhotoEditorComponent', () => {
  let component: GalleryPhotoEditorComponent;
  let fixture: ComponentFixture<GalleryPhotoEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GalleryPhotoEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryPhotoEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

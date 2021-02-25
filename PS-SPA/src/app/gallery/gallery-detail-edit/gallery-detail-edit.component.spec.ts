import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryDetailEditComponent } from './gallery-detail-edit.component';

describe('GalleryDetailEditComponent', () => {
  let component: GalleryDetailEditComponent;
  let fixture: ComponentFixture<GalleryDetailEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GalleryDetailEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryDetailEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

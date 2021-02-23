import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryMarineComponent } from './gallery-marine.component';

describe('GalleryMarineComponent', () => {
  let component: GalleryMarineComponent;
  let fixture: ComponentFixture<GalleryMarineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GalleryMarineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryMarineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

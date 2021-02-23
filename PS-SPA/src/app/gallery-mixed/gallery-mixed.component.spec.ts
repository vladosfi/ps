import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryMixedComponent } from './gallery-mixed.component';

describe('GalleryMixedComponent', () => {
  let component: GalleryMixedComponent;
  let fixture: ComponentFixture<GalleryMixedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GalleryMixedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryMixedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

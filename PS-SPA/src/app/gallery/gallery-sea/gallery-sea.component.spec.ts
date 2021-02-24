import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GallerySeaComponent } from './gallery-sea.component';

describe('GallerySeaComponent', () => {
  let component: GallerySeaComponent;
  let fixture: ComponentFixture<GallerySeaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GallerySeaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GallerySeaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

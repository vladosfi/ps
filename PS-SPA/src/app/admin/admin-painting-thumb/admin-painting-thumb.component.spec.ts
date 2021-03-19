import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPaintingThumbComponent } from './admin-painting-thumb.component';

describe('AdminPaintingListThumbComponent', () => {
  let component: AdminPaintingThumbComponent;
  let fixture: ComponentFixture<AdminPaintingThumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPaintingThumbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPaintingThumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

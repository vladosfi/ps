import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPaintingListThumbComponent } from './admin-painting-list-thumb.component';

describe('AdminPaintingListThumbComponent', () => {
  let component: AdminPaintingListThumbComponent;
  let fixture: ComponentFixture<AdminPaintingListThumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPaintingListThumbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPaintingListThumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

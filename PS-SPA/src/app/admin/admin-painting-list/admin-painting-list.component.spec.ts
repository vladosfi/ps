import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPaintingListComponent } from './admin-painting-list.component';

describe('AdminPaintingListComponent', () => {
  let component: AdminPaintingListComponent;
  let fixture: ComponentFixture<AdminPaintingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPaintingListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPaintingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

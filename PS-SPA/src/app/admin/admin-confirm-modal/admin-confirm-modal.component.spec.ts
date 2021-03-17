import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminConfirmModalComponent } from './admin-confirm-modal.component';

describe('AdminConfirmModalComponent', () => {
  let component: AdminConfirmModalComponent;
  let fixture: ComponentFixture<AdminConfirmModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminConfirmModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminConfirmModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaintingDetailsComponent } from './details.component';

describe('PaintingDetailsComponent', () => {
  let component: PaintingDetailsComponent;
  let fixture: ComponentFixture<PaintingDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaintingDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaintingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

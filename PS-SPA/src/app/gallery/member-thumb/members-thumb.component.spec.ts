import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberThumbComponent } from './members-thumb.component';

describe('MemberThumbComponent', () => {
  let component: MemberThumbComponent;
  let fixture: ComponentFixture<MemberThumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberThumbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberThumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

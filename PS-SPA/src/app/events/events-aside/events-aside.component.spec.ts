import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsAsideComponent } from './events-aside.component';

describe('EventsAsideComponent', () => {
  let component: EventsAsideComponent;
  let fixture: ComponentFixture<EventsAsideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventsAsideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsAsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

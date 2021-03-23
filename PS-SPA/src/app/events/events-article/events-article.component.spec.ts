import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsArticleComponent } from './events-article.component';

describe('ArticleComponent', () => {
  let component: EventsArticleComponent;
  let fixture: ComponentFixture<EventsArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventsArticleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

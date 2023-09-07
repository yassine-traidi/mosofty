import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizSpaceComponent } from './quiz-space.component';

describe('QuizSpaceComponent', () => {
  let component: QuizSpaceComponent;
  let fixture: ComponentFixture<QuizSpaceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuizSpaceComponent]
    });
    fixture = TestBed.createComponent(QuizSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

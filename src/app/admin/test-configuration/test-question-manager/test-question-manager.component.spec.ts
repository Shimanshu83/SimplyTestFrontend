import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestQuestionManagerComponent } from './test-question-manager.component';

describe('TestQuestionManagerComponent', () => {
  let component: TestQuestionManagerComponent;
  let fixture: ComponentFixture<TestQuestionManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestQuestionManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestQuestionManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

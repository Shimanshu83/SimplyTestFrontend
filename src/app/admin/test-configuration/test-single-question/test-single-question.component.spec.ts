import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSingleQuestionComponent } from './test-single-question.component';

describe('TestSingleQuestionComponent', () => {
  let component: TestSingleQuestionComponent;
  let fixture: ComponentFixture<TestSingleQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestSingleQuestionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestSingleQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

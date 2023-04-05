import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionPalletComponent } from './question-pallet.component';

describe('QuestionPalletComponent', () => {
  let component: QuestionPalletComponent;
  let fixture: ComponentFixture<QuestionPalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionPalletComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionPalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

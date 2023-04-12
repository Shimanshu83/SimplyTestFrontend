import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-question-pallet',
  templateUrl: './question-pallet.component.html',
  styleUrls: ['./question-pallet.component.scss']
})
export class QuestionPalletComponent {
  @Input() questions: any;

  @Output() questionIndexEmitter = new EventEmitter();

  @Input() currentQuestionSelected = 0;


  questionChange(index: number) {
    this.questionIndexEmitter.emit(index);
    this.currentQuestionSelected = index;
  }
}

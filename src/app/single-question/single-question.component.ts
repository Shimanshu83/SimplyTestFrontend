import { Component, DoCheck, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouterTestingHarness } from '@angular/router/testing';
import { QuestionCreatorService } from '../question-creator/question-creator.service';

@Component({
  selector: 'app-single-question',
  templateUrl: './single-question.component.html',
  styleUrls: ['./single-question.component.scss']
})
export class SingleQuestionComponent implements OnInit, DoCheck {

  @Input() questions: any;
  @Output() deleteQuestionEvent = new EventEmitter<number>();
  @Input() index?: number;

  formValid: boolean = true;


  constructor(private questionCreatorService: QuestionCreatorService) { }

  ngOnInit() {

    this.questionCreatorService.submitFired.subscribe((isFired) => {
      if (isFired == true) {
        this.isQuestionFormValid();
      }
    })
    console.log(this.questions)
  }

  ngDoCheck() {
    console.log(this.questions)
  }

  deleteQuestion() {

    this.deleteQuestionEvent.emit(this.index)

  }

  deleteOption(index: any) {
    if (this.questions.options.length > 2) {

      this.questions.options.splice(index, 1);
    }
  }

  insertOption(index: any) {

    if (this.questions.options.length < 6) {
      this.questions.options.splice(index, 0, {
        text: "Fill the box",
        correct: false
      });
    }
  }



  // let's create a form builder which will be valid if all the options field else 
  // this is not valid and we will not accept it 
  isQuestionFormValid() {
    // to check if form is valid we need to find if all the form value has the needed value or not 

    let isFormValid = true;

    for (let value of Object.keys(this.questions)) {

      if (this.questions[value] === null || this.questions[value] === "") {
        isFormValid = false;
        break;
      }

      if (this.questions[value] == "options") {

        if (this.questions[value].length > 0) {

          for (let elem of this.questions[value]) {
            if (elem.text === null || elem.text === "") {
              isFormValid = false;
              break;
            }

          }
          if (isFormValid == false) {
            break;
          }
        }
        else {
          isFormValid = false;
          break;
        }

      }
    }

    this.questions.formValid = isFormValid;
    this.formValid = isFormValid;


  }

  // we will show validation error all fields are required error all fields are required 


}

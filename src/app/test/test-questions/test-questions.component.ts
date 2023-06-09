import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TestService } from '../test.service';

@Component({
  selector: 'app-test-questions',
  templateUrl: './test-questions.component.html',
  styleUrls: ['./test-questions.component.scss']
})
export class TestQuestionsComponent implements OnInit {

  questions: any;
  durations: any = 0;
  currentIndex: number = 0;
  currentQuestion: any = {};
  totalQuestion: number = 0;

  visible: boolean = false;

  @ViewChild('disablePopUp') childRef: ElementRef;

  constructor(private testService: TestService) { }

  ngOnInit(): void {

    this.testService.questions.subscribe(
      value => {
        this.questions = value;
        this.totalQuestion = this.questions.length;
        this.currentQuestion = this.questions[this.currentIndex];
      }
    )
    this.testService.duration.subscribe(
      value => {
        this.durations = value;
        setTimeout(() => {

          this.finishTest();

        }, this.durations * 1000);
        this.timerFunction({ value: this.durations, class: "going" });

      }

    )

  }

  /**
  * 
  * @param timerValue for time value object  
  */
  timerFunction(timerValue: any) {
    setInterval(() => {
      if (timerValue.value < 6) {
        timerValue.class = "urgent"
      }
      if (timerValue.value > 0) {


        timerValue.value = timerValue.value - 1;
        this.testService.timer.next({ value: this.secondsToMinHour(timerValue.value) });

      }
    }, 1000);
  }

  /**
  * @param seconds accepts seconds and return string with hour min and seconds value 
  * 60s = 1min 
  * 60*60 = 1hour 
  * less then 60 in 59 seconds 
  */
  secondsToMinHour(seconds) {
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds % 3600) / 60);
    let remainingSeconds = seconds % 60;

    let timeString = '';
    if (hours > 0) {
      timeString += hours + ' h ';
    }
    if (hours != 0 || minutes > 0) {
      timeString += minutes + ' m ';
    }

    timeString += remainingSeconds + ' sec';

    return timeString.trim();
  }


  nextQuestion() {
    if (this.currentIndex < (this.questions.length - 1)) {
      this.currentIndex = this.currentIndex + 1;
      this.currentQuestion = this.questions[this.currentIndex];
    }
  }

  prevQuestion() {
    if (this.currentIndex > 0) {
      this.currentIndex = this.currentIndex - 1;
      this.currentQuestion = this.questions[this.currentIndex];

    }
  }

  submitAnswer(currentIndex) {
    this.visible = true;
    setTimeout(() => {
      this.visible = false;
      this.questions[currentIndex].submit = true;
    }, 1000);
  }

  changeQuestion(index: number) {
    this.currentIndex = index;
    this.currentQuestion = this.questions[this.currentIndex];
  }

  finishTest() {
    this.testService.timer.next(null);
    this.testService.status.next("end");
    this.childRef.nativeElement.click();
  }



}

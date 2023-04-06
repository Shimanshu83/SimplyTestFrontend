import { Component ,OnInit } from '@angular/core';
import { WelcomeService } from '../welcome/welcome.service';
import { QuestionService } from './question.service';

type TimerValue = {
  value : number,
  class : string    
}

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})

export class QuestionComponent implements OnInit {
  
  userName : String ;
  timer : TimerValue ={value : 10 , class : "going"}  ;
  questions : any = [];
  currentQuestion : any = {}; 
  currentIndex : number = 0 ;  

  constructor(private welcomeService : WelcomeService , private questionService : QuestionService){

  this.userName = this.welcomeService.name ; 
  
  }

  ngOnInit(): void {
    this.timerFunction(this.timer); 
    this.getAllQuestions(); 
  }


  getAllQuestions(){
    this.questionService.getQuestionJSON().subscribe( (response : any ) => {
      this.questions = response.questions ;  
      this.currentQuestion = this.questions[this.currentIndex]
      this.questionService.testName.next(response.testName) ; 
      console.log(this.questions)
    })
  }

  /**
   * 
   * @param timerValue for time value object  
   */
  timerFunction(timerValue : TimerValue ) {
    setInterval(() => {
      if(timerValue.value < 6){
        timerValue.class = "urgent"
      }
      if(timerValue.value > 0 ){


        timerValue.value = timerValue.value -1 ;
        this.questionService.timer.next(timerValue) ;  
      }
    } , 1000); 
  }


  nextQuestion(){
    if(this.currentIndex < (this.questions.length-1)){
      this.currentIndex = this.currentIndex + 1;
      this.currentQuestion = this.questions[this.currentIndex];
    }
  }

  prevQuestion(){
    if(this.currentIndex > 0){
      this.currentIndex = this.currentIndex - 1;  
      this.currentQuestion = this.questions[this.currentIndex];
    }
  }


  optionSelected(optionsObj : any  , index : number ){
    console.log(index) ; 
    optionsObj.selectedId =index ;
    console.log(this.questions) 
  }

  changeQuestion(index : number){
    this.currentIndex = index ; 
    this.currentQuestion = this.questions[this.currentIndex] ; 
  }
}

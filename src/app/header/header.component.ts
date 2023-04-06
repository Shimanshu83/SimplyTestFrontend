import { Component } from '@angular/core';
import { QuestionService } from '../question/question.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  userName : any ; 
  timer : any ; 
  testName : any ; 

  constructor(private questionService : QuestionService ){
    questionService.userName.subscribe((value) => {
      this.userName = value ; 
    }) ; 
    
    questionService.timer.subscribe((value) => {
      this.timer = value ; 
    }) ; 

    questionService.testName.subscribe((value) => {
      this.testName = value ; 
    }) ; 
  }

  

}

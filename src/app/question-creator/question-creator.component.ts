import { Component } from '@angular/core';
import { QuestionCreatorService } from './question-creator.service';



interface options {
  text : null | string , 
  correct : boolean 
}
interface value {
  id : number , 
  question : null | string , 
  options : options[] , 
  points : number , 
  correct : null | number  
}
@Component({
  selector: 'app-question-creator',
  templateUrl: './question-creator.component.html',
  styleUrls: ['./question-creator.component.scss']
})
export class QuestionCreatorComponent {

  questions  : any[]= [] ; 


  constructor( private questionCreatorService : QuestionCreatorService ){}

  
  addQuestion(){
    this.questions.push({
      id : 1 , 
      question : null , 
      options : [
        {
          text :  null , 
          correct : false  
        },
        {
          text :  null , 
          correct : false 
        },
        {
          text :  null , 
          correct : false 
        },
        {
          text :  null , 
          correct : false 
        },
  
      ],
      points : 0 ,
      correct : null
    }) ; 
  }

  deleteQuestion(index : number){
    this.questions.splice(index, 1) ;  
  }
  

  submitQuestion(){
    this.questionCreatorService.submitFired.next(true) ; 

    console.log(this.questions , "immediate reply for you" ) ;
    setTimeout(() => {
      
      console.log(this.questions) ; 
    }, 500);
  }

}

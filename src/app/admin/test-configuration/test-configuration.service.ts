import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"; 
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class TestConfigurationService {
    
    /**
     * initialize 1
     * basicSettingDone 2
     * qeustionAdded 3
     * Activated 4
     * 
    */
   testState = new BehaviorSubject(1);

   newQuestion = {
    "questions" : null, 
    "options" : [
        {
            "text": null
        },
        {
            "text": null
        },
        {
            "text": null
        },
    ],
    points : 1,
    correct : null 
   }

   questions = [{
    "question": "<h6><strong>Which is the interpreted programming language ?</strong></h6>",
    "options": [
        {
            "optionText": "<p>javascript</p>",
            "correct": true
        },
        {
            "optionText": "<p>java</p>",
            "correct": false
        },
        {
            "optionText": "<p>python</p>",
            "correct": true
        },
        {
            "optionText": "<p>c#</p>",
            "correct": false
        }
    ],
    "points": 1,
    "negativePoints": 0,
    "optionChoice": "2",
    "id": "13462456"
}] ; 

   constructor(private httpClient  : HttpClient ){
    
   }

   getQuestionById(id){
    return this.questions.filter( question => question.id == id ) ; 
   }
}
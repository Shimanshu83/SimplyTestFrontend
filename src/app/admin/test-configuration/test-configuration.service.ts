import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"; 
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class TestConfigurationService {
    
    /**
     * initialize
     * basicSettingDone -->
     * Activated ---> 
     * 
    */
   testState = new BehaviorSubject("basicSettingDone");

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
    "id": 13462456
}] ; 

   constructor(private httpClient  : HttpClient ){
    
   }
}
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


   constructor(private httpClient  : HttpClient ){}
}
import { Injectable} from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { Subject } from "rxjs";
@Injectable({
    providedIn : "root"    
})
export class QuestionService{
    
    userName =  new Subject() ;
    timer = new Subject() ; 
    testName = new Subject() ;  
    constructor(private httpClient : HttpClient ){
    }

    getQuestionJSON(){
        return this.httpClient.get<any>("assets/new-question.json"); 
    }
}
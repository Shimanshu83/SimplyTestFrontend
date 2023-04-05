import { Injectable} from "@angular/core";
import { HttpClient } from "@angular/common/http"
@Injectable({
    providedIn : "root"    
})
export class QuestionService{
    constructor(private httpClient : HttpClient ){

    }

    getQuestionJSON(){
        return this.httpClient.get<any>("assets/questions.json"); 
    }
}
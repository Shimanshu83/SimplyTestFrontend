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

    /// when edit I need to setup the whole state here 
    /// saving the data and all other things 
    //   how is this thing will work this is really one important here 

    questionCampaignIdData = new BehaviorSubject('');


    basicQuestionSetting: any = {};

    timeAccessSetting: any = {};

    newQuestion = {
        "questions": null,
        "options": [
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
        points: 1,
        correct: null
    }

    questions: any = [{
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
    }];

    constructor(private httpClient: HttpClient) {

    }




    getQuestionCampaignDetail(questionCampaignId) {
        return this.httpClient.get<any>(`/api/question-campaign?questionCampaignId=${questionCampaignId}`).subscribe(
            data => {
                console.log("Data response from the server", data);

                if (data.status == true) {


                    this.basicQuestionSetting = {
                        testName: data.values['testName'],
                        testCode: data.values['testCode'],
                        description: data.values['description'],
                        termsCondition: data.values['termsCondition']

                    };
                    this.questions = data.values['questions'];
                    let testCampaignStatus = data.values['status'] == "setupInProgress" ? 1 : ((data.values['status'] == 'active' || data.values['inactive']) ? 4 : 0);

                    this.questionCampaignIdData.next(data.values['_id'])



                    this.testState.next(testCampaignStatus);



                }
            }
        )

    }

    getQuestionById(id) {
        return this.questions.filter(question => question._id == id);
    }
}
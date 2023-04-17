import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from "@angular/common/http"


@Injectable()
export class AdminService {
    /**
     * initialize
     * basicSettingDone -->
     * Activated ---> 
     * 
     */
    testState = new BehaviorSubject("initialize");

    constructor(private httpClient: HttpClient) {



    }

    getTestList() {
        return this.httpClient.get<any>("assets/test-listing-response.json");
    }
}
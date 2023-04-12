import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from "@angular/common/http"

@Injectable()
export class TestService {

  status = new BehaviorSubject<String>("test-continue");
  userName = new BehaviorSubject<String | null>(null);
  timer = new BehaviorSubject<any>(null);
  testName = new BehaviorSubject<String | null>(null);

  questions = new BehaviorSubject<any>(null);
  duration = new BehaviorSubject<any>(null);


  constructor(private httpClient: HttpClient) {

  }

  getTestDetail() {
    return this.httpClient.get<any>("assets/test-detail.json");
  }


  submitUserAndGetTestData() {
    return this.httpClient.get<any>("assets/question-response.json");
  }
}

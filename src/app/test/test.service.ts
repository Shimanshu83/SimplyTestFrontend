import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from "@angular/common/http"

@Injectable()
export class TestService {
  // test-continue
  status = new BehaviorSubject<String>("start");
  userName = new BehaviorSubject<String | null>(null);
  timer = new BehaviorSubject<any>(null);
  testName = new BehaviorSubject<String | null>(null);

  questions = new BehaviorSubject<any>(null);
  duration = new BehaviorSubject<any>(null);


  constructor(private httpClient: HttpClient) {

  }

  getTestDetail(testId) {
    return this.httpClient.get<any>(`/api/test/get-basic-test-info?questionCampaignId=${testId}`);
  }


  submitUserAndGetTestData(formData) {
    return this.httpClient.post<any>("/api/test/start-test",formData);
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionCreatorService {

  submitFired = new Subject<boolean>();
  constructor() {

  }

}

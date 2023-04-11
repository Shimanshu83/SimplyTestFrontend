import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class TestService {

  status = new BehaviorSubject<String>("start"); 
  constructor() { }
}

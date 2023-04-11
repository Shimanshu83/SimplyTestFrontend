import { Component } from '@angular/core';
import { TestService } from '../test.service';

@Component({
  selector: 'app-test-header',
  templateUrl: './test-header.component.html',
  styleUrls: ['./test-header.component.scss']
})
export class TestHeaderComponent {
  userName: any;
  timer: any;
  testName: any;

  constructor(private testService: TestService) {
    testService.userName.subscribe((value) => {
      this.userName = value;
    });

    testService.timer.subscribe((value) => {
      this.timer = value;
    });

    testService.testName.subscribe((value) => {
      this.testName = value;
    });
  }
}

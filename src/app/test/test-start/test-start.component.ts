import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TestService } from '../test.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


@Component({
  selector: 'app-test-start',
  templateUrl: './test-start.component.html',
  styleUrls: ['./test-start.component.scss']
})
export class TestStartComponent implements OnInit {
  form!: FormGroup;
  instructions !: SafeHtml;
  testName !: string;
  constructor(private formBuilder: FormBuilder,
    private testService: TestService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.testService.getTestDetail().subscribe(testData => {
      if (testData.status == true) {
        this.testName = testData.data["test_name"];
        this.instructions = this.sanitizer.bypassSecurityTrustHtml(testData.data["instructions"]);

        this.testService.testName.next(this.testName);
      }
    })

  }
  createForm(): void {
    this.form = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit(): void {
    this.testService.submitUserAndGetTestData().subscribe(testData => {

      if (testData.status === true) {
        this.testService.duration.next(testData.data.duration);
        this.testService.questions.next(testData.data.questions);
        this.testService.userName.next(`${testData.data.user_data.first_name} ${testData.data.user_data.last_name}`);
        this.testService.status.next("test-continue")
      }
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TestService } from '../test.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-test-start',
  templateUrl: './test-start.component.html',
  styleUrls: ['./test-start.component.scss']
})
export class TestStartComponent implements OnInit {
  form!: FormGroup;
  instructions !: SafeHtml;
  testName !: string;
  testId : string; 
  constructor(private formBuilder: FormBuilder,
    private testService: TestService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute, 

  ) { }

  ngOnInit(): void {
    this.createForm();
    this.route.params.subscribe( value => {
      this.testId = value['testId'] ;
      this.gettingTestServiceData( this.testId ); 

    })
    

  }

  gettingTestServiceData(testId){
    this.testService.getTestDetail(testId).subscribe(testData => {
      console.log(testData) ; 
      if (testData.status == true) {
        
        this.testName = testData.values["testName"];
        this.instructions = this.sanitizer.bypassSecurityTrustHtml(testData.values["termsCondition"]);
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
    let formData = this.form.value; 
    formData.questionCampaignId = this.testId;

    this.testService.submitUserAndGetTestData(formData).subscribe(testData => {
      console.log(testData , 'testData'); 
      if (testData.status === true) {
        this.testService.duration.next(testData.values.duration);
        this.testService.questions.next(testData.values.finalQuestionData);
        this.testService.userName.next(`${formData.first_name} ${formData.last_name}`);
        this.testService.status.next("test-continue")
      }
    })
  }

}

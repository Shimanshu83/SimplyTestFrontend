import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TestService } from '../test.service';


@Component({
  selector: 'app-test-start',
  templateUrl: './test-start.component.html',
  styleUrls: ['./test-start.component.scss']
})
export class TestStartComponent implements OnInit {
  form!: FormGroup;
  constructor(private formBuilder: FormBuilder,
       private testService : TestService 
    ) { }

  ngOnInit(): void {
    this.createForm();
    
  }
  createForm(): void {
    this.form = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit(): void {
    console.log(this.form.value);
    // so whenever some one submit this 
    // what we need to do is submit the form to server 
    // and in response we will get the questions details 
    // set the questions details in the service 
    // after all this we will change the status event 
    // start the timer 
    this.testService.status.next("test-continue")
  }

}

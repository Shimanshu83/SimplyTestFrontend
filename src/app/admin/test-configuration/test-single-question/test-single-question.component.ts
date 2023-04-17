import { Component, OnDestroy, OnInit } from '@angular/core';
import { TestConfigurationService } from '../test-configuration.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';



@Component({
  selector: 'app-test-single-question',
  templateUrl: './test-single-question.component.html',
  styleUrls: ['./test-single-question.component.scss']
})
export class TestSingleQuestionComponent implements OnInit, OnDestroy {

  questionCreatorForm : FormGroup ; 
  question_data : any ; 
  constructor(
    private testConfigurationService : TestConfigurationService, 
    private route: ActivatedRoute,
    private fb : FormBuilder
    ){
      this.questionCreatorForm = this.fb.group({
        question : [null, [Validators.required]],
        options : this.fb.array([]),
        points : [null , [Validators.required]],
        
      })

    }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['questionId'];
      if(id == "new_question"){
          this.question_data = this.testConfigurationService.newQuestion ; 
      }
    });
  }

  ngOnDestroy(): void {
    
  }
}

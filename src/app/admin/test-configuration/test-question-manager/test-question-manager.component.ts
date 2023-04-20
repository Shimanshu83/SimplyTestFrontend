import { Component, OnInit } from '@angular/core';
import { TestConfigurationService } from '../test-configuration.service';
import { ActivatedRoute , Router } from '@angular/router';
@Component({
  selector: 'app-test-question-manager',
  templateUrl: './test-question-manager.component.html',
  styleUrls: ['./test-question-manager.component.scss']
})
export class TestQuestionManagerComponent implements OnInit{
  questions : any ; 

  constructor( 
    private testConfigurationService : TestConfigurationService , 
    private route: ActivatedRoute, 
    private router : Router 
    ){
    this.questions = this.testConfigurationService.questions ;
  }

  ngOnInit(): void {
    
    this.route.queryParams.subscribe(
      value => {
       if(value['redirect'] == "true"){
        this.router.navigate(["questions/new_questions"],{relativeTo : this.route})
       }
      }
    );
  }
}

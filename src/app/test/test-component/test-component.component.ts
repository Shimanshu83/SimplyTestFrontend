import { Component, OnInit } from '@angular/core';
import { TestService } from '../test.service';

@Component({
  selector: 'app-test-component',
  templateUrl: './test-component.component.html',
  styleUrls: ['./test-component.component.scss']
})
export class TestComponentComponent implements OnInit {

  status : String ; 
  constructor(private testService : TestService){


  }

  ngOnInit(){
    this.testService.status.subscribe( value => {
      this.status = value ; 
    })
  }

  
}

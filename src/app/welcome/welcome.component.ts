import { Component } from '@angular/core' ; 
import { WelcomeService } from './welcome.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {

  name : String = "" ; 
  constructor(private welcomeService : WelcomeService) {

  } 

  isDisabled(){
    // check if name has value and does it is greater then 4 
    return this.name.length > 4 ? false : true ;  
  }

  onSubmit(){
    this.welcomeService.name = this.name ; 
  }  



}

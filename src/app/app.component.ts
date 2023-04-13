import { Component , OnInit } from '@angular/core';
import { NavigationEnd, Router} from '@angular/router' ; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SimplyTestApp';

  url : any = null  ; 

  constructor(private router: Router) {}


  ngOnInit() {

    // not rendering header when this
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
         this.url = event.url.split('/')[1] ; 
      }
    });
  }
  
}

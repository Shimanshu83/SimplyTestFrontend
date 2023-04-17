import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-test-sidebar',
  templateUrl: './test-sidebar.component.html',
  styleUrls: ['./test-sidebar.component.scss']
})
export class TestSidebarComponent implements OnInit {


  testStatus: string;
  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    /**
    * initialize
    * basicSettingDone -->
    * Activated ---> 
    * 
    */
    this.adminService.testState.subscribe(status =>
      this.testStatus = status
    );

  }

}

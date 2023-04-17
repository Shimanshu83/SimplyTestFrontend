import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { TestConfigurationService } from '../test-configuration/test-configuration.service';

@Component({
  selector: 'app-test-sidebar',
  templateUrl: './test-sidebar.component.html',
  styleUrls: ['./test-sidebar.component.scss']
})
export class TestSidebarComponent implements OnInit {


  testStatus: string;
  constructor(private adminService: AdminService, private testConfigurationService : TestConfigurationService) { }

  ngOnInit(): void {
    /**
    * initialize
    * basicSettingDone -->
    * Activated ---> 
    * 
    */
    this.testConfigurationService.testState.subscribe(status =>
      this.testStatus = status
    );

  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TestConfigurationService } from './test-configuration.service';

@Component({
  selector: 'app-test-configuration',
  templateUrl: './test-configuration.component.html',
  styleUrls: ['./test-configuration.component.scss']
})
export class TestConfigurationComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private testConfigurationService: TestConfigurationService
  ) { }

  // need to check if this is new test or old test 


  ngOnInit(): void {
    this.route.params.subscribe(
      value => {
        console.log("queryParams value", value);
        if (value['test'] !== 'newTestCampaign') {
          this.testConfigurationService.getQuestionCampaignDetail(value['test']);
        }
      }
    )
  }

}

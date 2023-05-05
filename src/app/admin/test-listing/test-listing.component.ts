import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-test-listing',
  templateUrl: './test-listing.component.html',
  styleUrls: ['./test-listing.component.scss']
})
export class TestListingComponent implements OnInit {

  testList: any = [];
  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.getTestList().subscribe(response => {

      if (response.status == true) {
        this.testList = response.values;
      }
    })
  }
}

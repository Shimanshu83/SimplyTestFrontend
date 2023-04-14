import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { TestListingComponent } from './test-listing/test-listing.component';
import { TestSidebarComponent } from './test-sidebar/test-sidebar.component';
import { Routes , RouterModule } from '@angular/router';
import { AdminService } from './admin.service';
import { TestConfigurationComponent } from './test-configuration/test-configuration.component';
import { TestBasicSettingComponent } from './test-configuration/test-basic-setting/test-basic-setting.component';
import { TestQuestionManagerComponent } from './test-configuration/test-question-manager/test-question-manager.component';
import { TestTimeAccessSettingComponent } from './test-configuration/test-time-access-setting/test-time-access-setting.component';
import { TestResultTableComponent } from './test-configuration/test-result-table/test-result-table.component';
const routes : Routes = [
  {path : "admin" , component : TestListingComponent},
  { path : "admin/:test" , component : TestConfigurationComponent 
    , children  : [

  { path : "basic-setting", component : TestBasicSettingComponent},
  { path : "question-manager", component : TestQuestionManagerComponent},
  { path : "time-access-setting", component : TestTimeAccessSettingComponent},
  { path : "result-table", component : TestResultTableComponent }
    ]
  },
]

@NgModule({
  declarations: [
    AdminHeaderComponent,
    TestListingComponent,
    TestSidebarComponent,
    TestConfigurationComponent,
    TestBasicSettingComponent,
    TestQuestionManagerComponent,
    TestTimeAccessSettingComponent,
    TestResultTableComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  providers :[
    AdminService
  ]
})
export class AdminModule { }

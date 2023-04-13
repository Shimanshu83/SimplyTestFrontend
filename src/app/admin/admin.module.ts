import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { TestListingComponent } from './test-listing/test-listing.component';
import { TestSidebarComponent } from './test-sidebar/test-sidebar.component';
import { Routes , RouterModule } from '@angular/router';
import { AdminService } from './admin.service';
const routes : Routes = [
  {path : "admin" , component : TestListingComponent}
]

@NgModule({
  declarations: [
    AdminHeaderComponent,
    TestListingComponent,
    TestSidebarComponent
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

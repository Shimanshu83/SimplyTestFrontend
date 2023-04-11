import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestStartComponent } from './test-start/test-start.component';
import { TestEndComponent } from './test-end/test-end.component';
import { TestQuestionsComponent } from './test-questions/test-questions.component';
import { TestComponentComponent } from './test-component/test-component.component';
import { TestService } from './test.service';
import { RouterModule, Routes } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';


const routes: Routes = [
  { path: 'test', component: TestComponentComponent }
]

@NgModule({
  declarations: [
    TestStartComponent,
    TestEndComponent,
    TestQuestionsComponent,
    TestComponentComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MatInputModule,
    FormsModule,
    CommonModule, BrowserAnimationsModule,

  ],
  providers: [
    TestService
  ]
})
export class TestModule { }

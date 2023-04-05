import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionCreatorComponent } from './question-creator/question-creator.component';
import { QuestionComponent } from './question/question.component';
import { SingleQuestionComponent } from './single-question/single-question.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {path : '' , redirectTo : 'welcome' , pathMatch : "full"}, 
  {path : "welcome" , component : WelcomeComponent}, 
  {path : "question" , component : QuestionComponent}, 
  {path : "single_question" , component : QuestionCreatorComponent}, 
  {path : "*" , redirectTo : "welcome" , pathMatch : "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

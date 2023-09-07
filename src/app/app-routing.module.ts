import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListQuizzesComponent } from './list-quizzes/list-quizzes.component';
import { HomePageComponent } from './home-page/home-page.component';
import { QuizSpaceComponent } from './quiz-space/quiz-space.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  {path:'list-quizzes',component:ListQuizzesComponent},
  {path:'home-page',component:HomePageComponent},
  {path:'quiz-space',component:QuizSpaceComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

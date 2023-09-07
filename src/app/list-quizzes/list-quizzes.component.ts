import { Component , OnInit } from '@angular/core';
import { QuizService } from '../services/quiz.service';
import { Quiz } from '../interfaces/quiz.interface';
import { Router } from '@angular/router';
import { query } from '@angular/animations';

@Component({
  selector: 'app-list-quizzes',
  templateUrl: './list-quizzes.component.html',
  styleUrls: ['./list-quizzes.component.scss']
})
export class ListQuizzesComponent implements OnInit{

  quizzes:Quiz[]=[]

  constructor(private quizService:QuizService,private router:Router) { }
  ngOnInit(){
    this.lisQuizzes();
  }

  //list Quizzes
  lisQuizzes(){
    this.quizService.getQuizzes().subscribe(
      (response:Quiz[])=>{
        this.quizzes=response;
        console.log('Quizzes listed successfully !',response);
      }
    ),
    (error:Error)=>{
      console.log('Error listing quizzes !',error);
    }
  }

  //start quiz button
  redirectToQuiz(quiz:Quiz){
    console.log(quiz.questions);
    this.router.navigate(['/quiz-space'],{ queryParams: { quizId: quiz.id ,quizDescription:quiz.description} });
  }

}

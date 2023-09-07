import { Component, OnInit } from '@angular/core';
import { QuizService } from '../services/quiz.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from '../interfaces/question.interface';
import { QuestionService } from '../services/question.service';
import { Answer } from '../interfaces/answer.interface';
import { CandidateResponseService } from '../services/candidate-response.service';
import { CandidateResponse } from '../interfaces/candidateResponse.interface';
import { User } from '../interfaces/user.interface';
import { UserService } from '../user.service';
import { HtmlParser, IfStmt } from '@angular/compiler';
import { flatMap } from 'rxjs/operators';
import { Quiz } from '../interfaces/quiz.interface';
import { ScoreService } from '../services/score.service';
import { Score } from '../interfaces/score.interface';
import { ToastrService } from 'ngx-toastr/public_api';



@Component({
  selector: 'app-quiz-space',
  templateUrl: './quiz-space.component.html',
  styleUrls: ['./quiz-space.component.scss']
})
export class QuizSpaceComponent implements OnInit{

  questions:Question[]=[];

  quizId:number=0;
  quizDescription:string='';

  selectedAnswers:Answer[]=[];

  p:number=1;
  itemsPerPage:number=4;
  totalQuestions:any;

  currentQuestions: Question[] = [];

  isLastPage: boolean = false;

  isLoading:boolean=false;

  candidateResponses:CandidateResponse[]=[];

  user:User={
    id:0,
    email:'',
    username:'',
    phone:'',
    answers:[]
  }

  quiz:Quiz={
    id:0,
    description:'',
    questions:[],
  }

  candidateResponse:CandidateResponse={
    id:0,
    user:this.user,
    answers:[],
    quiz:this.quiz,
    
  }

  score:Score={
    id:0,
    score:0,
    user:this.user,
    quiz:this.quiz,
    date:new Date(),
  }


  constructor(private quizService:QuizService,private router:Router,private route:ActivatedRoute,private questionService:QuestionService
    ,private candidateResponseService:CandidateResponseService,private userService:UserService,private scoreService:ScoreService,
    private toastr:ToastrService) {
    this.route.queryParams.subscribe(params => {
      this.quizId = params['quizId'];
      console.log(this.quizId);
      this.quizDescription = params['quizDescription'];

      //set the quiz parameters
      this.quiz.id=this.quizId;
      this.quiz.description=this.quizDescription;

    });
  }
  ngOnInit(){
    this.listQuestions(this.quizId);
    this.getAllQuestions();
  }

  //list questions of a specific quiz by ID
  listQuestions(id:number){
    this.quizService.getQuestionsOfQuiz(this.quizId).subscribe(
      (response:Question[])=>{
        this.quiz.questions=response;
        this.questions=response;
        this.currentQuestions = this.questions.slice(0, this.itemsPerPage);
        console.log('Questions listed successfully !',response);
        
      }
    ),
    (error:Error)=>{
      console.log('Error listing questions !',error);
    }
  }

  //list answers of question
  listAnswers(id:number){
    this.questionService.getAnswers(id).subscribe(
      (response:Answer[])=>{
        console.log('Answers listed successfully !',response);
      }
    ),
    (error:Error)=>{
      console.log('Error listing answers !',error);
    }
  }

  //select answer 
  toggleAnswerSelected(question: Question, answer: Answer) {
    // Deselect all other answers for the same question
    for (const otherAnswer of question.answers) {
      if (otherAnswer !== answer) {
        otherAnswer.selected = false;
        this.selectedAnswers = this.selectedAnswers.filter(
          selectedAnswer => selectedAnswer !== otherAnswer
        );
      }
    }
  
    // Toggle the selected state of the clicked answer
    answer.selected = !answer.selected;
  
    // Update the selected answers list accordingly
    if (answer.selected) {
      this.selectedAnswers.push(answer);
    } else {
      this.selectedAnswers = this.selectedAnswers.filter(
        selectedAnswer => selectedAnswer !== answer
      );
    }
  
    console.log(this.selectedAnswers);
  }
  
  

  //get all questions
  public getAllQuestions(){
    this.questionService.getQuestions().subscribe(
      (response:Question[])=>{
        this.totalQuestions=response.length;
        console.log(this.totalQuestions,' questions.');
      }
    )
  }

  //update current questions list 
  updateCurrentQuestions(page: number) {
    this.isLoading = true;
  
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
  
    if (startIndex >= this.questions.length) {
      this.currentQuestions = [];
    } else {
      this.currentQuestions = this.questions.slice(startIndex, endIndex);
    }
  
    this.p = page;
  
    const totalPages = Math.ceil(this.questions.length / this.itemsPerPage);
    this.isLastPage = this.p === totalPages;
  
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }
  

  //scroll up when next-page is clicked
  scrollToTop() {
    window.scrollTo(0, 0);
  }


  //get candidate's info
  private getcandidateInfo(){
    this.user.email=(document.getElementById("email") as HTMLInputElement).value;
    this.user.phone=(document.getElementById("phone") as HTMLInputElement).value;
    this.user.username=(document.getElementById("name") as HTMLInputElement).value;

  }

  //save candidate info
  private saveUser(user:User){
    this.userService.saveUser(this.user).subscribe(
      (response:User)=>{
        this.user.id=response.id;
        console.log('Candidate saved successfully !',response);
      }
    ),
    (error:Error)=>{
      console.log('Error saving candidate !',error);
    }
  }

  //set candidate response info
  private setCandidateResponse(){
    this.candidateResponse.answers=this.selectedAnswers;
    this.candidateResponse.user=this.user;
  }

  //save candidate response
  private saveCandidateResponse(candidateResponse:CandidateResponse){
    this.candidateResponseService.saveCandidateResponse(candidateResponse).subscribe(
      (response:CandidateResponse)=>{
        candidateResponse.id=response.id;
        candidateResponse.quiz=this.quiz;
        console.log('Candidate response saved successfully !',response);
      }
    ),
    (error:Error)=>{
      console.log('Error saving candidate response !',error);
    }
  }

  //submit button
  submit() {
    this.getcandidateInfo();
    this.setCandidateResponse();
  
    // Save the user first
    this.user.answers=this.selectedAnswers;
    this.userService.saveUser(this.user).subscribe(
      (userResponse: User) => {
        this.user.answers=this.selectedAnswers;
        this.user.id = userResponse.id;
        console.log('Candidate saved successfully!', userResponse);
  
        // Set the user in candidate response
        this.candidateResponse.user = userResponse;
  
        // Calculate the score
        this.score.score = this.calculateScore();
        this.score.date=new Date();
        console.log(this.score.score);
        console.log(this.score.date);
  
        // Save the score
        this.saveScore(this.score);
      },
      (error: Error) => {
        console.log('Error saving candidate!', error);
      }
    );
    this.showSuccessToastrAndRedirect();
  }
  

  //calculate score
  calculateScore(): number {
    let totalScore=0;
    for(const answer of this.selectedAnswers){
      if(answer.value){
        totalScore+=1;
      }
    }
    return totalScore;
  }

    //save score
    private saveScore(score:Score){
      this.scoreService.saveScore(score).subscribe(
        (response:Score)=>{
          this.score.id=response.id;
          console.log('score added successfully !',response);
        }
      ),
      (error:Error)=>{
        console.log('Error adding score !',error);
      }
    }

    showSuccessToastrAndRedirect() {
      let username=(document.getElementById("name") as HTMLInputElement).value;
      let phone=(document.getElementById("phone") as HTMLInputElement).value;
      let email=(document.getElementById("email") as HTMLInputElement).value;
      if(username=="" && phone=="" && email=="" ){
        alert("Please fill out the form below!");
        // toastr 
      }
      else{
      // Display success toastr
      this.toastr.success('Submission successfull !','Sucess');
    
      // Redirect to the home page
     this.router.navigate(['/list-quizzes']);
      }
    }
}


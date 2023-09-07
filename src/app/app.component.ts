import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'candidate-space';

  constructor(private router:Router) {}

  redirectToQuizzes(){
    this.router.navigate(['/list-quizzes']);
  }
}

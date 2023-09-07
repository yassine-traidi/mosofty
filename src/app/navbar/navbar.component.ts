import { Component } from '@angular/core';
import { Router , NavigationStart, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  showLoadingBar = false;
  isNavbarCollapsed = true;

  constructor(private router:Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.showLoadingBar = true;
      } else if (event instanceof NavigationEnd) {
        this.showLoadingBar = false;
      }
    });
  }

  toggleNavbarCollapse() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

}

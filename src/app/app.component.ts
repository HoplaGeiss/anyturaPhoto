import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { Title } from '@angular/platform-browser';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  template: `
    <app-header></app-header>
    <main class="container mx-auto px-4">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
    }
  `]
})
export class AppComponent implements OnInit {
  private baseTitle = 'AnyturaPhoto';

  constructor(
    private router: Router,
    private titleService: Title
  ) {}

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const currentRoute = this.router.url;
      let pageTitle = this.baseTitle;

      // Add page-specific titles
      if (currentRoute !== '/') {
        // Remove the leading slash and capitalize the route name
        const routeName = currentRoute.substring(1);
        const capitalizedRoute = routeName.charAt(0).toUpperCase() + routeName.slice(1);
        pageTitle = `${this.baseTitle} - ${capitalizedRoute}`;
      }

      this.titleService.setTitle(pageTitle);
    });
  }
}

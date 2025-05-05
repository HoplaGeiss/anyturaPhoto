import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { UpdateNotificationComponent } from './components/update-notification/update-notification.component';
import { RouteMetaService } from './services/route-meta.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, UpdateNotificationComponent],
  template: `
    <app-header></app-header>
    <main class="container mx-auto px-4">
      <router-outlet></router-outlet>
    </main>
    <app-update-notification></app-update-notification>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
    }
  `]
})
export class AppComponent implements OnInit {
  constructor(private routeMetaService: RouteMetaService) {}

  ngOnInit() {
    // RouteMetaService is automatically initialized and handles route changes
  }
}

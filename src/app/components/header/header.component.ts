import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="bg-white shadow-md">
      <nav class="container mx-auto px-4 py-4">
        <div class="flex justify-between items-center">
          <a routerLink="/" class="text-2xl font-bold text-gray-800">Photography Blog</a>
          <ul class="flex space-x-6">
            <li><a routerLink="/" routerLinkActive="text-blue-600" [routerLinkActiveOptions]="{exact: true}" class="hover:text-blue-600 transition-colors">Home</a></li>
            <li><a routerLink="/about" routerLinkActive="text-blue-600" class="hover:text-blue-600 transition-colors">About</a></li>
            <li><a routerLink="/contact" routerLinkActive="text-blue-600" class="hover:text-blue-600 transition-colors">Contact</a></li>
          </ul>
        </div>
      </nav>
    </header>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class HeaderComponent {}

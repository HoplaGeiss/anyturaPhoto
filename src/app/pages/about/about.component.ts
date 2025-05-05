import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  template: `
    <div class="py-12 max-w-4xl mx-auto px-4">
      <h1 class="text-4xl font-bold mb-8 text-center">About Me</h1>
      
      <div class="flex flex-col md:flex-row gap-8 items-start">
        <div class="md:w-1/3">
          <img 
            src="https://picsum.photos/id/1062/800/800" 
            alt="Photographer profile" 
            class="w-full rounded-lg shadow-lg"
          >
        </div>
        
        <div class="md:w-2/3">
          <h2 class="text-2xl font-semibold mb-4">Hello, I'm [Your Name]</h2>
          
          <p class="text-gray-600 mb-4">
            I am a passionate photographer based in [Your Location]. My journey in photography 
            began over [X] years ago, and since then, I've been capturing the beauty of the 
            world through my lens.
          </p>
          
          <p class="text-gray-600 mb-4">
            My work focuses on landscape, urban, and nature photography. I believe that every 
            image tells a story, and I strive to capture those unique moments that might 
            otherwise go unnoticed.
          </p>
          
          <h3 class="text-xl font-semibold mb-3 mt-6">Equipment</h3>
          <ul class="list-disc list-inside text-gray-600 mb-6">
            <li>Canon EOS R5</li>
            <li>RF 24-70mm f/2.8L IS USM</li>
            <li>RF 70-200mm f/2.8L IS USM</li>
            <li>RF 15-35mm f/2.8L IS USM</li>
          </ul>
          
          <h3 class="text-xl font-semibold mb-3">Awards & Recognition</h3>
          <ul class="list-disc list-inside text-gray-600">
            <li>National Geographic Photo Contest Finalist 2023</li>
            <li>Local Photography Association Gold Award</li>
            <li>Featured in Photography Magazine</li>
          </ul>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class AboutComponent {}

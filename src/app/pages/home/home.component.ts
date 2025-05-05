import { Component } from '@angular/core';
import { CarouselComponent } from './components/carousel/carousel.component';
import { MosaicComponent } from '../../components/mosaic/mosaic.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselComponent, MosaicComponent],
  template: `
    <div class="py-8">
      <section class="max-w-3xl mx-auto text-center mb-12">
        <h1 class="text-4xl font-bold mb-4">Welcome to My Photography</h1>
        <p class="text-lg text-gray-600">
          Capturing life's beautiful moments through the lens. Explore my collection of 
          landscape, portrait, and street photography that tells stories through images.
        </p>
      </section>

      <section class="mb-16">
        <app-carousel></app-carousel>
      </section>

      <section class="mb-16">
        <h2 class="text-3xl font-bold text-center mb-8">Featured Work</h2>
        <app-mosaic></app-mosaic>
      </section>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class HomeComponent {}

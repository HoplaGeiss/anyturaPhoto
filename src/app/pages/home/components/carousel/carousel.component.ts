import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgFor, NgClass } from '@angular/common';
import { OptimizedImageComponent } from '../../../../components/optimized-image/optimized-image.component';
import { GalleryImage, featuredImages } from '../../../../config/images.config';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [NgFor, NgClass, OptimizedImageComponent],
  template: `
    <div class="relative max-w-5xl mx-auto">
      <div class="overflow-hidden rounded-lg shadow-lg">
        <div class="relative h-[600px]">
          <app-optimized-image
            *ngFor="let image of images; let i = index"
            [config]="{
              src: image.url,
              alt: image.title,
              loading: i === 0 ? 'eager' : 'lazy'
            }"
            [class.opacity-0]="i !== currentIndex"
            [class.opacity-100]="i === currentIndex"
            class="absolute inset-0 w-full h-full transition-opacity duration-500"
          ></app-optimized-image>
          <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
            <h3 class="text-2xl font-bold mb-2">{{images[currentIndex].title}}</h3>
            <p>{{images[currentIndex].description}}</p>
          </div>
        </div>
      </div>
      
      <button 
        (click)="prev()" 
        class="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-colors"
      >
        ←
      </button>
      
      <button 
        (click)="next()" 
        class="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-colors"
      >
        →
      </button>

      <div class="flex justify-center mt-4 space-x-2">
        <button 
          *ngFor="let image of images; let i = index"
          (click)="currentIndex = i"
          class="w-2 h-2 rounded-full transition-colors"
          [class.bg-blue-600]="i === currentIndex"
          [class.bg-gray-300]="i !== currentIndex"
        ></button>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class CarouselComponent implements OnInit, OnDestroy {
  images: GalleryImage[] = featuredImages;
  currentIndex = 0;
  private intervalId: any;

  ngOnInit(): void {
    this.startAutoAdvance();
  }

  ngOnDestroy(): void {
    this.stopAutoAdvance();
  }

  private startAutoAdvance(): void {
    this.intervalId = setInterval(() => {
      this.next();
    }, 5000);
  }

  private stopAutoAdvance(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  next(): void {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prev(): void {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }
}

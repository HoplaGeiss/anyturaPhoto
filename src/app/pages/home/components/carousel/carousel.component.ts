import { Component, OnInit } from '@angular/core';
import { NgFor, NgClass } from '@angular/common';

interface CarouselImage {
  url: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [NgFor, NgClass],
  template: `
    <div class="relative max-w-5xl mx-auto">
      <div class="overflow-hidden rounded-lg shadow-lg">
        <div class="relative h-[600px]">
          <img 
            [src]="images[currentIndex].url" 
            [alt]="images[currentIndex].title"
            class="w-full h-full object-cover transition-opacity duration-500"
          >
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
export class CarouselComponent implements OnInit {
  images: CarouselImage[] = [
    {
      url: 'https://picsum.photos/id/1018/1200/800',
      title: 'Mountain Sunrise',
      description: 'A breathtaking view of the sunrise over mountain peaks'
    },
    {
      url: 'https://picsum.photos/id/1015/1200/800',
      title: 'Foggy Forest',
      description: 'Mystical morning fog rolling through ancient trees'
    },
    {
      url: 'https://picsum.photos/id/1016/1200/800',
      title: 'Mountain Lake',
      description: 'Crystal clear waters reflecting majestic mountains'
    }
  ];

  currentIndex = 0;

  constructor() {}

  ngOnInit(): void {
    // Auto-advance the carousel every 5 seconds
    setInterval(() => {
      this.next();
    }, 5000);
  }

  next(): void {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prev(): void {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }
}

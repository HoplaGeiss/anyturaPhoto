import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIf } from '@angular/common';
import { OptimizedImageComponent } from '../optimized-image/optimized-image.component';

@Component({
  selector: 'app-image-modal',
  standalone: true,
  imports: [NgIf, OptimizedImageComponent],
  template: `
    <div *ngIf="isOpen" 
         class="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
         (click)="close()">
      <div class="relative w-full h-full flex items-center justify-center"
           (click)="$event.stopPropagation()">
        <button 
          (click)="close()"
          class="absolute top-0 right-0 text-white hover:text-gray-300 text-3xl p-4 z-10 bg-black/50 rounded-full m-4"
          aria-label="Close modal"
        >
          ✕
        </button>
        
        <div class="absolute inset-0 flex flex-col items-center justify-center">
          <div class="relative flex items-center justify-center p-4">
            <app-optimized-image
              [config]="{
                src: imageUrl,
                alt: title,
                loading: 'eager',
                sizes: '100vw',
                objectFit: 'contain'
              }"
              class="max-w-[90vw] max-h-[85vh] w-auto h-auto"
            ></app-optimized-image>
          </div>
          
          <div class="fixed bottom-0 left-0 right-0 text-white text-center bg-black/50 p-4 mx-4 mb-4 rounded-lg">
            <h3 class="text-2xl font-semibold mb-1">{{title}}</h3>
            <p class="text-lg text-gray-300 mb-2">{{category}}</p>
            <p class="text-base text-gray-200 max-w-2xl mx-auto">{{description}}</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    
    :host ::ng-deep app-optimized-image {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    :host ::ng-deep app-optimized-image img {
      width: auto;
      height: auto;
      max-width: 90vw;
      max-height: 85vh;
      object-fit: contain;
    }
  `]
})
export class ImageModalComponent {
  @Input() isOpen = false;
  @Input() imageUrl = '';
  @Input() title = '';
  @Input() category = '';
  @Input() description = '';
  @Output() closeModal = new EventEmitter<void>();

  close() {
    this.closeModal.emit();
  }
} 
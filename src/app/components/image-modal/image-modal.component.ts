import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-image-modal',
  standalone: true,
  imports: [NgIf],
  template: `
    <div *ngIf="isOpen" 
         class="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
         (click)="close()">
      <div class="relative max-w-7xl w-full max-h-[90vh] flex flex-col items-center"
           (click)="$event.stopPropagation()">
        <button 
          (click)="close()"
          class="absolute -top-12 right-0 text-white hover:text-gray-300 text-xl p-2"
        >
          ✕
        </button>
        <img 
          [src]="imageUrl" 
          [alt]="title"
          class="max-h-[85vh] w-auto object-contain rounded-lg shadow-2xl"
        >
        <div class="mt-4 text-white text-center">
          <h3 class="text-xl font-semibold">{{title}}</h3>
          <p class="text-gray-300">{{category}}</p>
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
export class ImageModalComponent {
  @Input() isOpen = false;
  @Input() imageUrl = '';
  @Input() title = '';
  @Input() category = '';
  @Output() closeModal = new EventEmitter<void>();

  close(): void {
    this.closeModal.emit();
  }
} 
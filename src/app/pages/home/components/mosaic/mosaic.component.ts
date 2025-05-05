import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { ImageModalComponent } from '../image-modal/image-modal.component';

interface MosaicImage {
  url: string;
  title: string;
  category: string;
}

@Component({
  selector: 'app-mosaic',
  standalone: true,
  imports: [NgFor, ImageModalComponent],
  template: `
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div *ngFor="let image of images" 
           class="group relative overflow-hidden rounded-lg shadow-lg aspect-square cursor-pointer"
           (click)="openModal(image)">
        <img [src]="image.url" 
             [alt]="image.title"
             class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110">
        <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div class="absolute bottom-0 left-0 right-0 p-4 text-white">
            <h3 class="text-lg font-semibold">{{image.title}}</h3>
            <p class="text-sm text-gray-200">{{image.category}}</p>
          </div>
        </div>
      </div>
    </div>

    <app-image-modal
      [isOpen]="isModalOpen"
      [imageUrl]="selectedImage?.url || ''"
      [title]="selectedImage?.title || ''"
      [category]="selectedImage?.category || ''"
      (closeModal)="closeModal()"
    ></app-image-modal>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class MosaicComponent {
  images: MosaicImage[] = [
    {
      url: 'https://picsum.photos/id/1039/1600/1600',
      title: 'Desert Dawn',
      category: 'Landscape'
    },
    {
      url: 'https://picsum.photos/id/1033/1600/1600',
      title: 'Paris Streets',
      category: 'Urban'
    },
    {
      url: 'https://picsum.photos/id/1036/1600/1600',
      title: 'Autumn Colors',
      category: 'Nature'
    },
    {
      url: 'https://picsum.photos/id/1043/1600/1600',
      title: 'Misty Woods',
      category: 'Nature'
    },
    {
      url: 'https://picsum.photos/id/1044/1600/1600',
      title: 'Coastal Sunset',
      category: 'Seascape'
    },
    {
      url: 'https://picsum.photos/id/1047/1600/1600',
      title: 'City Nights',
      category: 'Urban'
    }
  ];

  isModalOpen = false;
  selectedImage: MosaicImage | null = null;

  openModal(image: MosaicImage): void {
    this.selectedImage = image;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedImage = null;
  }
}

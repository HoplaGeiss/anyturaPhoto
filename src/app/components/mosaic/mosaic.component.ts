import { Component, Input } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ImageModalComponent } from '../image-modal/image-modal.component';
import { OptimizedImageComponent } from '../optimized-image/optimized-image.component';
import { GalleryImage, galleryImages } from '../../config/images.config';

@Component({
  selector: 'app-mosaic',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, ImageModalComponent, OptimizedImageComponent],
  template: `
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <ng-container *ngFor="let image of displayedImages">
        <div 
          class="group relative overflow-hidden rounded-lg shadow-lg aspect-square cursor-pointer"
          (click)="openModal(image)">
          <app-optimized-image
            [config]="{
              src: image.url,
              alt: image.title,
              loading: 'lazy',
              objectFit: 'cover'
            }"
            class="w-full h-full"
          ></app-optimized-image>
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div class="absolute bottom-0 left-0 right-0 p-4 text-white">
              <h3 class="text-lg font-semibold">{{image.title}}</h3>
              <p class="text-sm text-gray-200">{{image.category}}</p>
            </div>
          </div>
        </div>
      </ng-container>
      
      <a *ngIf="!showAll" 
         routerLink="/work"
         class="group relative overflow-hidden rounded-lg shadow-lg aspect-square bg-black/5 hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
        <div class="text-center">
          <h3 class="text-xl font-semibold mb-2">See All Work</h3>
          <p class="text-gray-600">Explore the complete collection</p>
        </div>
      </a>
    </div>

    <app-image-modal
      [isOpen]="isModalOpen"
      [imageUrl]="selectedImage?.url || ''"
      [title]="selectedImage?.title || ''"
      [category]="selectedImage?.category || ''"
      [description]="selectedImage?.description || ''"
      (closeModal)="closeModal()"
      class="modal-view"
    ></app-image-modal>
  `,
  styles: [`
    :host {
      display: block;
    }

    :host ::ng-deep app-optimized-image {
      width: 100%;
      height: 100%;
    }
  `]
})
export class MosaicComponent {
  @Input() showAll = false;

  allImages: GalleryImage[] = galleryImages;
  isModalOpen = false;
  selectedImage: GalleryImage | null = null;

  get displayedImages(): GalleryImage[] {
    return this.showAll ? this.allImages : this.allImages.slice(0, 5);
  }

  openModal(image: GalleryImage): void {
    this.selectedImage = image;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedImage = null;
  }
}



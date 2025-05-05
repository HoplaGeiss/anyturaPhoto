import { Component, Input, OnInit } from '@angular/core';
import { NgOptimizedImage, NgStyle } from '@angular/common';
import { ImageService, ImageConfig } from '../../services/image.service';

@Component({
  selector: 'app-optimized-image',
  standalone: true,
  imports: [NgOptimizedImage, NgStyle],
  template: `
    <picture class="w-full h-full flex items-center justify-center">
      <source
        [srcset]="imageAttributes.srcset"
        [sizes]="imageAttributes.sizes"
        type="image/webp">
      <img
        [src]="imageAttributes.src"
        [alt]="imageAttributes.alt"
        [width]="imageAttributes.width"
        [height]="imageAttributes.height"
        [loading]="imageAttributes.loading"
        [ngStyle]="{
          'object-fit': config.objectFit || 'cover',
          'width': config.objectFit === 'contain' ? 'auto' : '100%',
          'height': config.objectFit === 'contain' ? 'auto' : '100%'
        }"
        (error)="onImageError($event)">
    </picture>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }

    :host picture {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    :host img {
      display: block;
      max-width: 100%;
      max-height: 100%;
    }

    :host-context(.modal-view) img {
      width: auto;
      height: auto;
      object-fit: contain;
    }
  `]
})
export class OptimizedImageComponent implements OnInit {
  @Input() config!: ImageConfig & { objectFit?: 'contain' | 'cover' };
  imageAttributes: ReturnType<ImageService['getImageAttributes']>;

  constructor(private imageService: ImageService) {
    this.imageAttributes = {
      src: '',
      srcset: '',
      sizes: '',
      alt: '',
      loading: 'lazy'
    };
  }

  ngOnInit() {
    this.imageAttributes = this.imageService.getImageAttributes(this.config);
  }

  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = '/assets/images/fallback.jpg';
    img.srcset = '';
  }
} 
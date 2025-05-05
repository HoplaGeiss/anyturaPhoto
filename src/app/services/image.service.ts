import { Injectable } from '@angular/core';

export interface ImageConfig {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  sizes?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private readonly breakpoints = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536
  };

  generateSrcSet(imagePath: string): string {
    // For now, just return the original image path since we don't have WebP versions
    return imagePath;
  }

  generateSizes(config: { mobile?: string; tablet?: string; desktop?: string } = {}): string {
    const defaults = {
      mobile: '100vw',
      tablet: '50vw',
      desktop: '33vw'
    };

    const sizes = { ...defaults, ...config };

    return `
      (max-width: ${this.breakpoints.sm}px) ${sizes.mobile},
      (max-width: ${this.breakpoints.lg}px) ${sizes.tablet},
      ${sizes.desktop}
    `.trim();
  }

  getImageAttributes(config: ImageConfig): {
    src: string;
    srcset: string;
    sizes: string;
    alt: string;
    width?: number;
    height?: number;
    loading: 'lazy' | 'eager';
  } {
    return {
      src: config.src,
      srcset: this.generateSrcSet(config.src),
      sizes: config.sizes || this.generateSizes(),
      alt: config.alt,
      width: config.width,
      height: config.height,
      loading: config.loading || 'lazy'
    };
  }
} 
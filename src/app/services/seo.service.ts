import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  constructor(
    private meta: Meta,
    private title: Title
  ) {}

  updateTitle(title: string) {
    this.title.setTitle(`${title} | Anytura Photography`);
  }

  updateMetaTags(config: {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
  }) {
    const defaults = {
      title: 'Professional Photography Portfolio',
      description: 'Professional photography portfolio showcasing stunning portraits, landscapes, and events.',
      image: 'assets/images/og-image.jpg',
      url: 'https://anytura-photo.netlify.app'
    };

    const data = { ...defaults, ...config };

    this.meta.updateTag({ name: 'description', content: data.description });
    
    // Open Graph
    this.meta.updateTag({ property: 'og:title', content: data.title });
    this.meta.updateTag({ property: 'og:description', content: data.description });
    this.meta.updateTag({ property: 'og:image', content: data.image });
    this.meta.updateTag({ property: 'og:url', content: data.url });

    // Twitter
    this.meta.updateTag({ name: 'twitter:title', content: data.title });
    this.meta.updateTag({ name: 'twitter:description', content: data.description });
    this.meta.updateTag({ name: 'twitter:image', content: data.image });
    this.meta.updateTag({ name: 'twitter:url', content: data.url });
  }
} 
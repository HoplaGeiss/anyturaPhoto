import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { SeoService } from './seo.service';
import { filter } from 'rxjs/operators';

interface RouteMetaConfig {
  title: string;
  description: string;
  image?: string;
}

@Injectable({
  providedIn: 'root'
})
export class RouteMetaService {
  private readonly routeMetaConfig: Record<string, RouteMetaConfig> = {
    '/': {
      title: 'Professional Photography Portfolio | Anytura Photography',
      description: 'Explore our stunning collection of landscape, portrait, and street photography. Professional photography services for all your needs.',
      image: '/assets/images/og-image.jpg'
    },
    '/work': {
      title: 'Photography Portfolio Gallery | Anytura Photography',
      description: 'Browse our complete collection of professional photographs, including landscapes, portraits, urban scenes, and nature photography.',
      image: '/assets/images/gallery-preview.jpg'
    },
    '/about': {
      title: 'About the Photographer | Anytura Photography',
      description: 'Learn about our professional photographer, their journey, equipment, and achievements in the field of photography.',
      image: '/assets/images/profile.jpg'
    },
    '/contact': {
      title: 'Contact Us | Anytura Photography',
      description: 'Get in touch for photography services, collaborations, or inquiries. Professional photography services available for booking.',
      image: '/assets/images/contact-preview.jpg'
    }
  };

  constructor(
    private router: Router,
    private seoService: SeoService
  ) {
    this.initializeRouteMetaObserver();
  }

  private initializeRouteMetaObserver(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateMetaForRoute(event.urlAfterRedirects);
      }
    });
  }

  private updateMetaForRoute(url: string): void {
    const config = this.routeMetaConfig[url] || this.routeMetaConfig['/'];
    
    this.seoService.updateTitle(config.title);
    this.seoService.updateMetaTags({
      title: config.title,
      description: config.description,
      image: config.image,
      url: `https://anytura-photo.netlify.app${url}`
    });
  }
} 
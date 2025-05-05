import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerformanceService {
  private readonly cacheVersion = 'v1';
  private readonly cacheName = 'anytura-photo-cache';
  private updateAvailable = new BehaviorSubject<boolean>(false);
  updateAvailable$ = this.updateAvailable.asObservable();

  constructor(private swUpdate: SwUpdate) {
    this.initializeServiceWorker();
  }

  private async initializeServiceWorker() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.versionUpdates.subscribe(event => {
        if (event.type === 'VERSION_READY') {
          this.updateAvailable.next(true);
        }
      });

      // Check for updates every hour
      setInterval(() => {
        this.swUpdate.checkForUpdate();
      }, 60 * 60 * 1000);
    }
  }

  async updateApp() {
    if (this.swUpdate.isEnabled) {
      await this.swUpdate.activateUpdate();
      document.location.reload();
    }
  }

  async preloadImage(src: string) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  }

  async preloadCriticalImages(images: string[]) {
    const preloadPromises = images.map(src => this.preloadImage(src));
    await Promise.all(preloadPromises);
  }

  async cacheResources(resources: string[]) {
    if ('caches' in window) {
      const cache = await caches.open(this.cacheName);
      await cache.addAll(resources);
    }
  }

  async clearOldCaches() {
    if ('caches' in window) {
      const cacheNames = await caches.keys();
      const oldCaches = cacheNames.filter(name => name !== this.cacheName);
      await Promise.all(oldCaches.map(name => caches.delete(name)));
    }
  }
} 
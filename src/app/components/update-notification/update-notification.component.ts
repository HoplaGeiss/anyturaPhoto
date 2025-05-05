import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-update-notification',
  standalone: true,
  imports: [NgIf],
  template: `
    <div *ngIf="showUpdate" class="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-lg shadow-lg z-50 flex items-center gap-4">
      <p>A new version is available!</p>
      <button 
        (click)="updateApp()"
        class="px-4 py-2 bg-white text-blue-600 rounded hover:bg-blue-50 transition-colors"
      >
        Update Now
      </button>
    </div>
  `
})
export class UpdateNotificationComponent implements OnInit {
  showUpdate = false;

  constructor(private swUpdate: SwUpdate) {}

  ngOnInit() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.versionUpdates.subscribe(event => {
        if (event.type === 'VERSION_READY') {
          this.showUpdate = true;
        }
      });
    }
  }

  updateApp() {
    this.swUpdate.activateUpdate().then(() => document.location.reload());
  }
} 
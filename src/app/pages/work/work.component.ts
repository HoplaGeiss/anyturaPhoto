import { Component } from '@angular/core';
import { MosaicComponent } from '../../components/mosaic/mosaic.component';
import { RouterLink } from '@angular/router';
import { ImageModalComponent } from '../../components/image-modal/image-modal.component';

@Component({
  selector: 'app-work',
  standalone: true,
  imports: [MosaicComponent, RouterLink, ImageModalComponent],
  template: `
    <div class="py-8">
      <section class="max-w-7xl mx-auto px-4">
        <h1 class="text-4xl font-bold mb-8 text-center">All Work</h1>
        <app-mosaic [showAll]="true"></app-mosaic>
      </section>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class WorkComponent {} 
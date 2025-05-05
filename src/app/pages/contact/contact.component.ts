import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  template: `
    <div class="py-12 max-w-2xl mx-auto px-4">
      <h1 class="text-4xl font-bold mb-8 text-center">Contact Me</h1>
      
      <div class="bg-white rounded-lg shadow-lg p-6">
        <form 
          [formGroup]="contactForm" 
          method="POST" 
          name="contact"
          data-netlify="true"
          netlify-honeypot="bot-field"
          action="/contact?success=true"
          class="space-y-6">
          
          <input type="hidden" name="form-name" value="contact" />
          <p class="hidden">
            <label>Don't fill this out if you're human: <input name="bot-field" /></label>
          </p>

          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input 
              type="text" 
              id="name" 
              name="name"
              formControlName="name"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              [class.border-red-500]="contactForm.get('name')?.invalid && contactForm.get('name')?.touched"
            >
            <div *ngIf="contactForm.get('name')?.invalid && contactForm.get('name')?.touched" class="text-red-500 text-sm mt-1">
              Please enter your name
            </div>
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email"
              formControlName="email"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              [class.border-red-500]="contactForm.get('email')?.invalid && contactForm.get('email')?.touched"
            >
            <div *ngIf="contactForm.get('email')?.invalid && contactForm.get('email')?.touched" class="text-red-500 text-sm mt-1">
              Please enter a valid email address
            </div>
          </div>

          <div>
            <label for="message" class="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea 
              id="message" 
              name="message"
              formControlName="message"
              rows="5"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              [class.border-red-500]="contactForm.get('message')?.invalid && contactForm.get('message')?.touched"
            ></textarea>
            <div *ngIf="contactForm.get('message')?.invalid && contactForm.get('message')?.touched" class="text-red-500 text-sm mt-1">
              Please enter your message
            </div>
          </div>

          <button 
            type="submit"
            class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            [disabled]="contactForm.invalid || submitting"
          >
            {{ submitting ? 'Sending...' : 'Send Message' }}
          </button>
        </form>

        <div *ngIf="submitted" class="mt-6 p-4 bg-green-100 text-green-700 rounded-md">
          <p class="font-medium">Thank you for your message!</p>
          <p class="mt-1">I'll get back to you as soon as possible.</p>
        </div>
      </div>
    </div>
  `
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  submitting = false;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  ngOnInit() {
    // Check if we're returning from a successful form submission
    this.route.queryParams.subscribe(params => {
      if (params['success'] === 'true') {
        this.submitted = true;
        // Remove the success parameter from the URL without navigating
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: {},
          replaceUrl: true
        });
      }
    });
  }
}

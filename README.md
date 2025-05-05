# Anytura Photography

A modern, responsive photography portfolio built with Angular and Tailwind CSS.

## Features

- Responsive design
- Image carousel for featured works
- Mosaic gallery layout
- About page
- Contact form
- Modern UI with animations
- Mobile-friendly
- PWA support

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd anytura-photo
```

2. Install dependencies:
```bash
npm install
```

3. Add your images:
- Place your carousel images in `src/assets/images/` as `photo1.jpg`, `photo2.jpg`, `photo3.jpg`
- Place your gallery images in `src/assets/images/` as `gallery1.jpg` through `gallery6.jpg`
- Add your profile photo as `profile.jpg`

4. Start the development server:
```bash
npm start
```

5. Open your browser and navigate to `http://localhost:4200`

## Customization

1. Update the about page content in `src/app/pages/about/about.component.ts`
2. Modify the carousel images in `src/app/components/carousel/carousel.component.ts`
3. Update the gallery images in `src/app/components/mosaic/mosaic.component.ts`

## Build

To build the project for production:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Technologies Used

- Angular 17
- Tailwind CSS
- TypeScript
- RxJS

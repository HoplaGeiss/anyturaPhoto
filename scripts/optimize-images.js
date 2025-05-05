const sharp = require('sharp');
const glob = require('glob');
const path = require('path');
const fs = require('fs').promises;

const sizes = [320, 640, 768, 1024, 1280, 1536];
const quality = 80;

async function optimizeImage(inputPath) {
  const dir = path.dirname(inputPath);
  const ext = path.extname(inputPath);
  const name = path.basename(inputPath, ext);
  
  // Original image optimization
  await sharp(inputPath)
    .jpeg({ quality, progressive: true })
    .toFile(path.join(dir, `${name}-optimized${ext}`));

  // Generate WebP versions for different sizes
  for (const width of sizes) {
    await sharp(inputPath)
      .resize(width, null, {
        withoutEnlargement: true,
        fit: 'inside'
      })
      .webp({ quality })
      .toFile(path.join(dir, `${name}-${width}.webp`));
  }
}

async function processImages() {
  try {
    const images = glob.sync('src/assets/images/**/*.{jpg,jpeg,png}');
    console.log(`Found ${images.length} images to process`);

    for (const image of images) {
      console.log(`Processing ${image}...`);
      await optimizeImage(image);
    }

    console.log('Image optimization complete!');
  } catch (error) {
    console.error('Error processing images:', error);
    process.exit(1);
  }
}

processImages(); 
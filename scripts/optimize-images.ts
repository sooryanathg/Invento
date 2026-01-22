import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const TARGET_FILES = [
  { input: 'public/home/preview/technical-mobile.svg', output: 'public/home/preview/technical-mobile.webp', quality: 80 },
  { input: 'public/home/preview/general-mobile.svg', output: 'public/home/preview/general-mobile.webp', quality: 80 },
  { input: 'public/about/second.png', output: 'public/about/second.webp', quality: 75, resizeWidth: 1920 }, // Optimizing the huge about image
  { input: 'public/second.png', output: 'public/second.webp', quality: 75, resizeWidth: 1920 }, 
  { input: 'public/home/preview/fejo.png', output: 'public/home/preview/fejo.webp', quality: 80, resizeWidth: 1200 },
  { input: 'public/home/left-side.svg', output: 'public/home/left-side.webp', quality: 80 },
  { input: 'public/home/right-side.svg', output: 'public/home/right-side.webp', quality: 80 },
  { input: 'public/home/middle-mobile.svg', output: 'public/home/middle-mobile.webp', quality: 80 },
];

async function optimizeImages() {
  console.log('Starting optimization...');

  for (const file of TARGET_FILES) {
    const inputPath = path.resolve(process.cwd(), file.input);
    const outputPath = path.resolve(process.cwd(), file.output);

    if (!fs.existsSync(inputPath)) {
      console.warn(`Skipping missing file: ${file.input}`);
      continue;
    }

    try {
      console.log(`Optimizing: ${file.input} -> ${file.output}`);
      
      let pipeline = sharp(inputPath);

      if (file.resizeWidth) {
        pipeline = pipeline.resize({ width: file.resizeWidth, withoutEnlargement: true });
      }

      await pipeline
        .webp({ quality: file.quality })
        .toFile(outputPath);

      const inputStats = fs.statSync(inputPath);
      const outputStats = fs.statSync(outputPath);
      const savings = ((inputStats.size - outputStats.size) / inputStats.size * 100).toFixed(2);

      console.log(`✅ Success! Reduced by ${savings}% (${(inputStats.size / 1024 / 1024).toFixed(2)}MB -> ${(outputStats.size / 1024 / 1024).toFixed(2)}MB)`);
    } catch (error) {
      console.error(`❌ Error optimizing ${file.input}:`, error);
    }
  }

  console.log('Optimization complete.');
}

optimizeImages();

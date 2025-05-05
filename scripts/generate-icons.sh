#!/bin/bash

# Create icons directory if it doesn't exist
mkdir -p src/assets/icons

# Array of required sizes
sizes=(72 96 128 144 152 192 384 512)

# Generate PNG icons for each size
for size in "${sizes[@]}"; do
  npx svgexport src/assets/icons/icon-512x512.svg src/assets/icons/icon-${size}x${size}.png ${size}:${size}
done

# Generate favicon.ico (multi-size ico file)
convert src/assets/icons/icon-32x32.png src/assets/icons/icon-16x16.png favicon.ico 
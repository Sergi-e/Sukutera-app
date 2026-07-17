import convert from 'heic-convert'
import { readFile, writeFile, mkdir } from 'fs/promises'
import path from 'path'
import sharp from 'sharp'

const SRC = 'C:/Users/serge/OneDrive/Pictures/Sukutera'
const OUT = 'public/images'

const MAP = [
  { src: 'IMG_6582.HEIC', out: 'hero-lake.jpg' },
  { src: 'IMG_6580.HEIC', out: 'shoreline.jpg' },
  { src: 'IMG_6552.HEIC', out: 'collector.jpg' },
  { src: 'IMG_6541.HEIC', out: 'plastic-bag.jpg' },
  { src: 'IMG_6561.HEIC', out: 'researcher.jpg' },
  { src: 'IMG_6586.JPG.jpeg', out: 'waste-house.jpg' },
]

await mkdir(OUT, { recursive: true })

for (const { src, out } of MAP) {
  const input = path.join(SRC, src)
  const output = path.join(OUT, out)
  try {
    if (src.toLowerCase().includes('.jpg') || src.toLowerCase().includes('.jpeg')) {
      // .rotate() with no args reads EXIF orientation and bakes it into pixels, then strips the tag
      await sharp(input).rotate().jpeg({ quality: 85, mozjpeg: true }).toFile(output)
    } else {
      const inputBuffer = await readFile(input)
      const jpegBuffer = await convert({
        buffer: inputBuffer,
        format: 'JPEG',
        quality: 0.85,
      })
      // Apply EXIF auto-rotation so the resulting JPEG has correct pixel orientation
      await sharp(Buffer.from(jpegBuffer)).rotate().jpeg({ quality: 85, mozjpeg: true }).toFile(output)
    }
    console.log(`✓ ${out}`)
  } catch (err) {
    console.error(`✗ ${out}:`, err.message)
  }
}

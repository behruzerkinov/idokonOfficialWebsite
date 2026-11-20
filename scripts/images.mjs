// Builds responsive AVIF + WebP images into public/img from the masters in assets/.
// Needs ffmpeg with libaom-av1 and libwebp on PATH (a build tool, not a package). Run: bun run images
import { execFileSync } from 'node:child_process';
import { mkdirSync, existsSync } from 'node:fs';

const OUT = 'public/img';
mkdirSync(OUT, { recursive: true });

// Screens keep full chroma (yuv444) so small coloured UI text stays sharp.
const screens = [
  ['kassa', [640, 960, 1280]],
  ['showcase_kassirlar', [640, 960, 1359]],
  ['showcase_savdo', [640, 960, 1353]],
  ['showcase_ombor', [640, 960, 1359]],
  ['showcase_analitika', [640, 960, 1347]],
  ['course_test', [640, 960, 1400]],
  ['course_kassa_sotish', [480, 700]],
  ['course_qurilmalar', [480, 700]],
];
// Product photos are placed on one 4:3 white canvas so every card has the same shape.
const hardware = ['monoblok1', 'monoblok2', 'printer1', 'printer2', 'scanner1', 'box1', 'scale1', 'scale2', 'scale3'];

const run = (args) => execFileSync('ffmpeg', ['-v', 'error', '-y', ...args], { stdio: 'inherit' });
const encode = (input, vf, name, w, pix) => {
  const filter = `${vf ? vf + ',' : ''}scale=${w}:-2:flags=lanczos`;
  run(['-i', input, '-vf', filter, '-c:v', 'libwebp', '-quality', '82', '-compression_level', '6', `${OUT}/${name}-${w}.webp`]);
  run(['-i', input, '-vf', `${filter},format=${pix}`, '-c:v', 'libaom-av1', '-still-picture', '1', '-crf', '30', '-b:v', '0', '-cpu-used', '4', `${OUT}/${name}-${w}.avif`]);
};

for (const [name, widths] of screens) for (const w of widths) encode(`assets/screens/${name}.webp`, '', name, w, 'yuv444p');

const canvas = 'scale=720:540:force_original_aspect_ratio=decrease:flags=lanczos,pad=800:600:(ow-iw)/2:(oh-ih)/2:white';
for (const name of hardware) for (const w of [400, 800]) encode(`assets/hardware/${name}.webp`, canvas, name, w, 'yuv420p');

// Logo: 2x of its 98px display width, alpha kept (WebP only; AVIF alpha via ffmpeg is unreliable)
run(['-i', 'assets/brand/idokon_logo.webp', '-vf', 'scale=196:-2:flags=lanczos', '-c:v', 'libwebp', '-quality', '90', `${OUT}/logo-196.webp`]);

console.log('images written to', OUT, existsSync(OUT));

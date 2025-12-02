// Name: Matthew Cagulada | File: main.js | Date: November 30, 2025

const thumbBar  = document.querySelector('.thumb-bar');
const fullImg   = document.querySelector('.full-img');
const btn       = document.querySelector('button');

// rubric: filenames array is const and starts at index 1
const images = [null,'pic1.jpg','pic2.jpg','pic3.jpg','pic4.jpg','pic5.jpg'];

// meaningful ALT text for accessibility
const alts = [null,
  'Abstract AI/technology schematic with neural network icons.',
  'Macro photo of dew droplets on filaments with bokeh.',
  '3D illustration of a water molecule model with bubbles inside.',
  'Medical/lab graphic showing test tubes and flasks in a circular HUD.',
  'Medical scan illustration highlighting a gland with orange glow.'
];

// Build thumbnails (loop starts at 1 to match rubric)
for (let i = 1; i < images.length; i++) {
  const img = document.createElement('img');
  img.src = `images/${images[i]}`;
  img.alt = alts[i];
  img.tabIndex = 0;

  // click/keyboard to swap
  const swap = () => {
    fullImg.src = img.src;
    fullImg.alt = img.alt;
  };
  img.addEventListener('click', swap);
  img.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); swap(); }
  });

  thumbBar.appendChild(img);
}

// Darken / Lighten toggle using class attribute value (per rubric)
btn.addEventListener('click', () => {
  const isDark = btn.getAttribute('class') === 'dark';
  if (isDark) {
    btn.setAttribute('class','light');
    btn.textContent = 'Lighten';
    btn.setAttribute('aria-pressed','true');
    fullImg.style.filter = 'brightness(60%)';
  } else {
    btn.setAttribute('class','dark');
    btn.textContent = 'Darken';
    btn.setAttribute('aria-pressed','false');
    fullImg.style.filter = 'brightness(100%)';
  }
});

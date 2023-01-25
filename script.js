const canvas = document.getElementById('canvas');
const pixels = document.getElementsByClassName('pixel');
const colorSelector = document.getElementById('colorpicker');
const eraser = document.getElementById('eraser');
const slider = document.getElementById('slider');
const clearGrid = document.getElementById('clear');
const rainbow = document.getElementById('rainbow');

const presets = {
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  9: 36,
  10: 40,
  11: 44,
  12: 48,
  13: 52,
  14: 56,
  15: 60,
  16: 64,
  17: 68,
  18: 72,
  19: 76,
  20: 80,
  21: 84,
  22: 88,
  23: 92,
  24: 96,
  25: 100,
};

gridSizeSelector(presets[Number(slider.value)]);

slider.addEventListener('change', () => {
  gridSizeSelector(presets[Number(slider.value)]);
});

function rgbValue() {
  return Math.floor(Math.random() * 256);
}

clearGrid.addEventListener('click', () => {
  for (let pixel of pixels) {
    pixel.style.backgroundColor = '#ffffff';
  }
});

function paintPixel(clrSelection) {
  let isDown;
  for (let pixel of pixels) {
    pixel.addEventListener('mousedown', () => {
      isDown = true;
    });
    pixel.addEventListener('mouseup', () => {
      isDown = false;
    });
    pixel.addEventListener('mouseover', () => {
      if (clrSelection === 'rainbow') {
        isDown
          ? (pixel.style.backgroundColor = `rgb(${rgbValue()},${rgbValue()},${rgbValue()})`)
          : (isDown = false);
      } else {
        isDown
          ? (pixel.style.backgroundColor = clrSelection)
          : (isDown = false);
      }
    });
  }
}

colorSelector.addEventListener('change', () => {
  let clrSelection = colorSelector.value;
  paintPixel(clrSelection);
});

eraser.addEventListener('click', () => {
  let clrSelection = eraser.value;
  paintPixel(clrSelection);
});

rainbow.addEventListener('click', () => {
  paintPixel('rainbow');
});

function gridGenerator(input) {
  canvas.style.gridTemplateColumns = `repeat(${input}, 1fr)`;
  canvas.style.gridTemplateRows = `repeat(${input}, 1fr)`;
  return input * input;
}

function gridSizeSelector(input) {
  let child = canvas.lastElementChild;
  while (child) {
    canvas.removeChild(child);
    child = canvas.lastElementChild;
  }
  for (let i = 1; i <= gridGenerator(input); i++) {
    let div = document.createElement('div');
    div.classList.add('pixel');
    canvas.append(div);
  }
  paintPixel(colorSelector.value);
}

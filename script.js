const container = document.getElementById("sketch-container");
const pixels = document.getElementsByClassName("pixel");
const colorSelector = document.getElementById("colorpicker");
const eraser = document.getElementById("eraser");
const slider = document.getElementById("slider");
const clearGrid = document.getElementById("clear");

gridSizeSelector(48);

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

slider.addEventListener("change", () => {
  gridSizeSelector(presets[Number(slider.value)]);
});

clearGrid.addEventListener("click", () => {
  for (let pixel of pixels) {
    pixel.style.backgroundColor = "#eae7dc";
  }
});

function paintPixel(clrSelection) {
  let isDown;
  for (let pixel of pixels) {
    pixel.addEventListener("mousedown", () => {
      isDown = true;
    });
    pixel.addEventListener("mouseup", () => {
      isDown = false;
    });
    pixel.addEventListener("mouseover", () => {
      isDown ? (pixel.style.backgroundColor = clrSelection) : (isDown = false);
    });
  }
}

colorSelector.addEventListener("change", () => {
  let clrSelection = colorSelector.value;
  paintPixel(clrSelection);
});

eraser.addEventListener("click", () => {
  let clrSelection = eraser.value;
  paintPixel(clrSelection);
});

function gridGenerator(input) {
  container.style.gridTemplateColumns = `repeat(${input}, 1fr)`;
  container.style.gridTemplateRows = `repeat(${input}, 1fr)`;
  return input * input;
}

function gridSizeSelector(input) {
  let child = container.lastElementChild;
  while (child) {
    container.removeChild(child);
    child = container.lastElementChild;
  }
  for (let i = 1; i <= gridGenerator(input); i++) {
    let div = document.createElement("div");
    div.classList.add("pixel");
    container.append(div);
  }
  paintPixel(colorSelector.value);
}

/* `rgb(${Math.floor(Math.random() * 256)},${Math.floor(
    Math.random() * 256
  )},${Math.floor(Math.random() * 256)})` */

const container = document.getElementById("sketch-container");
const pixel = document.getElementsByClassName("pixel");
const sizeSelector = document.getElementById("size-selector");
const colorSelector = document.getElementById("colorpicker");
const preset = document.getElementsByClassName("preset");

const presets = {
  0: 16,
  1: 32,
  2: 48,
  3: 64,
  4: 80,
  5: 96,
};

sizePicker(16);

colorSelector.addEventListener("mouseout", () => {
  let selection = colorSelector.value;
  for (let i = 0; i < pixel.length; i++) {
    pixel[i].addEventListener("mouseover", () => {
      pixel[i].style.backgroundColor = selection;
    });
  }
});

for (let i = 0; i < preset.length; i++) {
  preset[i].addEventListener("click", () => {
    sizePicker(presets[i]);
  });
}

sizeSelector.addEventListener("click", () => {
  let input = parseInt(prompt("Pick a size between 1 and 100"));
  let size = input <= 100 && input >= 1 ? input : 16;
  sizePicker(size);
});

function gridGenerator(input) {
  container.style.gridTemplateColumns = `repeat(${input}, 1fr)`;
  container.style.gridTemplateRows = `repeat(${input}, 1fr)`;
  return input * input;
}

function sizePicker(int) {
  let child = container.lastElementChild;
  while (child) {
    container.removeChild(child);
    child = container.lastElementChild;
  }
  for (let i = 1; i <= gridGenerator(int); i++) {
    let div = document.createElement("div");
    div.classList.add("pixel");
    container.append(div);
  }
}

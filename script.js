const container = document.getElementById("sketch-container");
const pixel = document.getElementsByClassName("pixel");
const sizeSelector = document.getElementById("size-selector");
const colorselector = document.getElementById("colorpicker");

sizePicker(16);

colorselector.addEventListener("mouseout", () => {
  let selection = colorselector.value;
  for (let i = 0; i < pixel.length; i++) {
    pixel[i].addEventListener("mouseover", () => {
      pixel[i].style.backgroundColor = selection;
    });
  }
});

sizeSelector.addEventListener("click", () => {
  let child = container.lastElementChild;
  while (child) {
    container.removeChild(child);
    child = container.lastElementChild;
  }
  let input = parseInt(prompt("Pick a size between 0 and 100"));
  let size = input <= 100 && input >= 1 ? input : 16;
  sizePicker(size);
});

function gridGenerator(input) {
  container.style.gridTemplateColumns = `repeat(${input}, 1fr)`;
  container.style.gridTemplateRows = `repeat(${input}, 1fr)`;
  return input * input;
}

function sizePicker(int) {
  for (let i = 1; i <= gridGenerator(int); i++) {
    let div = document.createElement("div");
    div.classList.add("pixel");
    container.append(div);
  }
}

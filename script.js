"use strict";

const gridContainer = document.querySelector(".drawing-grid");
const gridItems = [];

const btnRemoveLines = document.getElementById("remove-lines");
const btnClear = document.getElementById("clear");
const rangeSlider = document.querySelector(".range-slider");
const settings = document.querySelector(".settings");
const rangeText = document.querySelector(".range-text");
const rainbow = document.getElementById("rainbow");
const eraser = document.getElementById("eraser");
const shading = document.getElementById("shading");
const drawingColorPicker = document.querySelector(".drawing-color-picker");
const backgroundColorPicker = document.querySelector(
  ".background-color-picker"
);
const buttons = document.querySelectorAll(".btn-drawings");

let isMouseDown = false;
let isRainbowClicked = false;
let isEraser = false;
let drawingColor = "#000000";
let backgroundColor = "#ffffff";
let isShadowingClicked = false;

function updateGridBackground() {
  gridItems.forEach(
    (gridItem) => (gridItem.style.backgroundColor = backgroundColor)
  );
}

drawingColorPicker.addEventListener("input", function () {
  drawingColor = drawingColorPicker.value;
});

backgroundColorPicker.addEventListener("input", function () {
  backgroundColor = backgroundColorPicker.value;
  updateGridBackground();
});

rainbow.addEventListener("click", function () {
  isRainbowClicked = !isRainbowClicked;
  if (isShadowingClicked) isShadowingClicked != isShadowingClicked;
});

eraser.addEventListener("click", function () {
  isEraser = !isEraser;
  if (isRainbowClicked) isRainbowClicked = false;
  console.log("Eraser clicked");
});

shading.addEventListener("click", function () {
  isShadowingClicked = !isShadowingClicked;
});

function createGrid(cells) {
  gridContainer.style.display = "grid";
  gridContainer.style.gridTemplateColumns = `repeat(${cells},1fr)`;
  gridContainer.style.gridTemplateRows = `repeat(${cells},1fr)`;
  gridContainer.style.height = "40rem";
  gridContainer.style.width = "40rem";
  gridContainer.style.border = `1px solid black`;

  for (let i = 0; i < cells * cells; i++) {
    const gridItem = document.createElement("div");
    gridItem.style.border = `1px solid black`;
    gridItem.style.backgroundColor = backgroundColor;
    gridContainer.appendChild(gridItem);
    gridItems.push(gridItem);
  }

  gridItems.forEach((gridItem) => {
    gridItem.addEventListener("mousedown", function () {
      isMouseDown = true;
    });

    gridItem.addEventListener("mouseup", function () {
      isMouseDown = false;
    });

    gridItem.addEventListener("mouseover", function (event) {
      if (event.buttons === 1 && isMouseDown) {
        if (isEraser) {
          gridItem.style.backgroundColor = backgroundColor;
        } else if (isRainbowClicked) {
          gridItem.style.backgroundColor = `rgb${randomColor()}`;
        } else if (isShadowingClicked) {
          gridItem.style.backgroundColor = "#ababab";
        } else {
          gridItem.style.backgroundColor = drawingColor;
        }
      }
    });
  });
}

createGrid(32);

btnRemoveLines.addEventListener("click", function () {
  if (btnRemoveLines.textContent === "Remove Grid") {
    for (let gridItem of gridItems) {
      gridItem.style.border = "none";
      btnRemoveLines.textContent = "Add Grid";
      btnRemoveLines.classList.add("active");
    }
  } else if (btnRemoveLines.textContent === "Add Grid") {
    for (let gridItem of gridItems) {
      gridItem.style.border = `1px solid black`;
      btnRemoveLines.textContent = "Remove Grid";
      btnRemoveLines.classList.remove("active");
    }
  }
});

btnClear.addEventListener("click", function () {
  for (let gridItem of gridItems) {
    if (
      gridItem.style.backgroundColor !== gridContainer.style.backgroundColor
    ) {
      gridItem.style.backgroundColor = gridContainer.style.backgroundColor;
    }
  }
});

function clearGrid() {
  while (gridContainer.firstChild) {
    gridContainer.removeChild(gridContainer.firstChild);
  }
}

rangeSlider.addEventListener("input", function () {
  let columnsNumber = rangeSlider.value;
  clearGrid();
  createGrid(columnsNumber);
  addColumnRange(columnsNumber);
});

function addColumnRange(columnsNumber) {
  rangeText.textContent = `${columnsNumber}x${columnsNumber}`;
}

function randomColor() {
  let color = `(${Math.floor(Math.random() * 255)},${Math.floor(
    Math.random() * 255
  )},${Math.floor(Math.random() * 255)})`;
  return color;
}

buttons.forEach((btn) => {
  btn.addEventListener("click", function (event) {
    // Prevent the button click event from reaching the grid cells
    event.stopPropagation();

    buttons.forEach((button) => {
      if (button !== btn) {
        button.classList.remove("active");
      }
    });
    this.classList.toggle("active");
  });
});

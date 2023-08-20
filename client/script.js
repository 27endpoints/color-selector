const socket = io();

const colorPicker = document.getElementById("colorPicker");
const colorDisplay = document.getElementById("colorDisplay");

colorPicker.addEventListener("input", () => {
  const selectedColor = colorPicker.value;
  colorDisplay.style.backgroundColor = selectedColor;
  socket.emit("changeColor", selectedColor);
});

socket.on("changeColor", (color) => {
  colorDisplay.style.backgroundColor = color;
});

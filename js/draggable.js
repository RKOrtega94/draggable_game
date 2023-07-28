/**
 * Función para construir el ejercicio de arrastrar y soltar
 *
 * @param {string} id id del contenedor del ejercicio
 * @param {array} items array de imágenes para arrastrar
 *
 * Ejemplo de uso:
 * buildDragDrop("p1act", ["img1.jpg", "img2.jpg", "img3.jpg"]);
 *
 * Nota:
 *
 * ! Para los estilos de debe importar el archivo css draggable.css
 * ? <link rel="stylesheet" href="css/draggable.css" />
 *
 * ! Para el funcionamiento de debe importar el archivo js draggable.js
 * ? <script src="js/draggable.js"></script>
 */
function buildDragDrop(id, items) {
  /* Prepare container  pass id of container*/
  let container = document.getElementById(id);
  container.setAttribute("class", "draggable-container");

  let dragItemsContainer = document.createElement("div");
  dragItemsContainer.setAttribute("class", "draggable-items-container");

  /* Add drag items */
  items.forEach((item, i) => {
    let draggableItem = document.createElement("div");
    draggableItem.setAttribute("id", `drag-${i + 1}`);
    draggableItem.setAttribute("class", "draggable-item");
    draggableItem.setAttribute("data-order", i + 1);
    draggableItem.setAttribute("data-img", item);
    draggableItem.setAttribute("draggable", "true");

    let img = document.createElement("img");
    img.setAttribute("src", item);
    img.setAttribute("class", "img-responsive");

    draggableItem.appendChild(img);

    dragItemsContainer.appendChild(draggableItem);
  });

  /* Build draggable res container */
  let dragResContainer = document.createElement("div");
  dragResContainer.setAttribute("class", "draggable-res-container");
  dragResContainer.setAttribute("id", "drag-res-container-p1act");

  /* Add inputs containers */
  for (let i = 1; i <= items.length; i++) {
    let inputContainer = document.createElement("div");
    inputContainer.setAttribute("class", "drag-input-container");
    inputContainer.setAttribute("id", `drag-input-container-${i}`);

    let orderIndicator = document.createElement("span");
    orderIndicator.setAttribute("class", "order-indicator");
    orderIndicator.innerHTML = i;

    inputContainer.appendChild(orderIndicator);

    dragResContainer.appendChild(inputContainer);
  }

  /* Reorder items */
  let rItems = dragItemsContainer.children;

  for (let i = rItems.length; i >= 0; i--) {
    dragItemsContainer.appendChild(rItems[(Math.random() * i) | 0]);
  }

  /* Add containers to DOM */
  container.appendChild(dragItemsContainer);
  container.appendChild(dragResContainer);
}

var dragItems;
var containers;
let draggedItem = null;

function dragStart() {
  draggedItem = this;
  setTimeout(() => (this.style.display = "none"), 0);
}

function dragEnd() {
  draggedItem.style.display = "flex";
  draggedItem = null;
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
  this.style.border = "2px solid #42baed";
}

function dragLeave() {
  this.style.border = "1px solid #42baed";
}

function dragDrop() {
  this.appendChild(draggedItem);
  this.style.border = "1px solid #42baed";
}

$(document).ready(function () {
  dragItems = document.querySelectorAll(".draggable-item");
  containers = document.querySelectorAll(".drag-input-container");

  dragItems.forEach((item) => {
    item.addEventListener("dragstart", dragStart);
    item.addEventListener("dragend", dragEnd);
  });

  containers.forEach((container) => {
    container.addEventListener("dragover", dragOver);
    container.addEventListener("dragenter", dragEnter);
    container.addEventListener("dragleave", dragLeave);
    container.addEventListener("drop", dragDrop);
  });
});

/**
 * Ésta función es para calificar la respuesta del ejercicio de arrastrar y soltar
 *
 * @param {string} id id del contenedor del ejercicio
 * @param {array} items array de imágenes para arrastrar
 *
 * Ejemplo de uso:
 * coreDraggable("p1act", ["img1.jpg", "img2.jpg", "img3.jpg"]);
 *
 * Nota:
 *
 * ! Para validar la respuesta los items deben estar en el orden correcto en función a la calificación
 */
function coreDraggable(id, items) {
  core = 0;

  for (let i = 0; i < items.length; i++) {
    let item = document.getElementById(`drag-input-container-${i + 1}`);
    /* Check if attribute src exist */
    let img = item.children[1]
      ? item.children[1].children[0].getAttribute("src")
      : null;

    if (img == null) {
      $("#drag-input-container-" + (i + 1)).addClass("mal");
      continue;
    }

    let order = item.children[0].innerHTML;

    if (img == items[i] && order == i + 1) {
      core += 1;
      $("#drag-input-container-" + (i + 1)).addClass("bien");
    } else {
      $("#drag-input-container-" + (i + 1)).addClass("mal");
    }
  }

  return core / items.length;
}

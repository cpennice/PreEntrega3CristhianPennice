const addItemButton = document.querySelector("#addItemButton");
const cartBody = document.querySelector("#cartBody");
const totalValueSpan = document.querySelector("#totalValue");

let cartItems = [];

// Intentamos obtener el estado anterior del carrito desde el localStorage
const storedCartItems = localStorage.getItem("cartItems");
if (storedCartItems) {
  cartItems = JSON.parse(storedCartItems);
  renderCartItems();
  updateCartTotal();
}

addItemButton.addEventListener("click", function () {
  const nombreArticulo = prompt("Ingrese el nombre del artículo:");
  const precioArticulo = parseFloat(
    prompt("Ingrese el precio de " + nombreArticulo + ":")
  );
  const cantidadArticulo = parseInt(
    prompt("Ingrese la cantidad de " + nombreArticulo + ":")
  );

  if (cantidadArticulo > 0) {
    const newCartItem = {
      nombre: nombreArticulo,
      precio: precioArticulo,
      cantidad: cantidadArticulo,
    };
    cartItems.push(newCartItem);
    renderCartItem(newCartItem);
    updateCartTotal();
    saveCartItemsToStorage();
  }
});

cartBody.addEventListener("click", function (event) {
  if (event.target.classList.contains("delete-item")) {
    const itemIndex = Array.from(cartBody.children).indexOf(
      event.target.parentNode.parentNode
    );
    cartItems.splice(itemIndex, 1);
    event.target.parentNode.parentNode.remove();
    updateCartTotal();
    saveCartItemsToStorage();
  }
});

function renderCartItem(item) {
  const newCartItemTotal = item.precio * item.cantidad;
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
    <td>${item.nombre}</td>
    <td>${item.precio}</td>
    <td>${item.cantidad}</td>
    <td>${newCartItemTotal}</td>
    <td><button class="btn btn-danger delete-item">Eliminar</button></td>
  `;
  cartBody.appendChild(newRow);
}

function renderCartItems() {
  cartItems.forEach(function (item) {
    renderCartItem(item);
  });
}

function updateCartTotal() {
  const cartItemsTotal = cartItems.reduce(
    (total, item) => total + item.precio * item.cantidad,
    0
  );
  totalValueSpan.textContent = cartItemsTotal;
}

function saveCartItemsToStorage() {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

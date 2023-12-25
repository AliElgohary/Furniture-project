document.addEventListener("DOMContentLoaded", function () {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const cartInfo = document.getElementById("cartInfo");

  if (user && user.cart && user.cart.length > 0) {
    cartInfo.innerHTML = "";
    user.cart.forEach((item, index) => {
      const cartItemRow = document.createElement("tr");
      const totalForItem = 1 * parseFloat(item.price);

      cartItemRow.innerHTML = `
              <td>${item.name}</td>
              <td>$${item.price}</td>
              <td>${item.stockQuantity}</td>
              <td><img src="${item.image}" alt="${item.name}"></td>
              <td>$${totalForItem.toFixed(2)}</td>
              <td><button class="delete-btn" data-index="${index}">Delete</button></td>
          `;

      cartInfo.appendChild(cartItemRow);
    });

    const totalCell = document.querySelector("tfoot td:last-child");
    totalCell.textContent = `$${calculateTotal(user.cart).toFixed(2)}`;

    const deleteButtons = document.querySelectorAll(".delete-btn");
    deleteButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const index = parseInt(button.getAttribute("data-index"));
        user.cart.splice(index, 1);
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        location.reload();
      });
    });
  } else {
    cartInfo.innerHTML = "<tr><td colspan='6'>Your cart is empty.</td></tr>";
  }

  function calculateTotal(cart) {
    return cart.reduce((total, item) => total + 1 * parseFloat(item.price), 0);
  }
});

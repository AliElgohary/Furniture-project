document.addEventListener("DOMContentLoaded", function () {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const cartInfo = document.getElementById("cartInfo");
  const orderHistorySection = document.querySelector(".order-history-section");
  const orderHistoryTable = document.getElementById("orderHistoryTable");
  const totalAmount = document.getElementById("totalAmount");

  function updateCartDisplay() {
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

      const total = calculateTotal(user.cart);
      totalAmount.textContent = `$${total.toFixed(2)}`;

      const deleteButtons = document.querySelectorAll(".delete-btn");
      deleteButtons.forEach((button) => {
        button.addEventListener("click", function () {
          const index = parseInt(button.getAttribute("data-index"));
          user.cart.splice(index, 1);
          localStorage.setItem("loggedInUser", JSON.stringify(user));
          updateCartDisplay();
        });
      });
    } else {
      cartInfo.innerHTML = "<tr><td colspan='6'>Your cart is empty.</td></tr>";
      totalAmount.textContent = "$0.00";
    }
  }

  function calculateTotal(cart) {
    return cart.reduce((total, item) => total + 1 * parseFloat(item.price), 0);
  }

  function updateOrderHistoryDisplay() {
    if (user && user.orderHistory && user.orderHistory.length > 0) {
      orderHistoryTable.innerHTML = "";
      user.orderHistory.forEach((order, orderIndex) => {
        const orderRow = document.createElement("tr");

        orderRow.innerHTML = `
            <td colspan="5">Order ${orderIndex + 1}</td>
        `;
        orderHistoryTable.appendChild(orderRow);

        order.forEach((item, itemIndex) => {
          const orderItemRow = document.createElement("tr");

          orderItemRow.innerHTML = `
              <td>${item.name}</td>
              <td>$${item.price}</td>
              <td>${item.stockQuantity}</td>
              <td><img src="${item.image}" alt="${item.name}"></td>
              <td>$${(1 * parseFloat(item.price)).toFixed(2)}</td>
          `;

          orderHistoryTable.appendChild(orderItemRow);
        });
      });
      orderHistorySection.style.display = "block";
    } else {
      orderHistorySection.style.display = "none";
    }
  }

  updateCartDisplay();
  updateOrderHistoryDisplay();

  const checkoutButton = document.getElementById("confirmOrder");
  checkoutButton.addEventListener("click", function () {
    if (user) {
      if (!user.orderHistory) {
        user.orderHistory = [];
      }
      const orderCopy = user.cart.map((item) => ({ ...item }));
      if (orderCopy.length > 0) {
        user.orderHistory.push(orderCopy);
      }

      user.cart = [];

      localStorage.setItem("loggedInUser", JSON.stringify(user));

      updateCartDisplay();
      updateOrderHistoryDisplay();
    } else {
      console.log("User is not logged in. Cannot checkout.");
    }
  });
});

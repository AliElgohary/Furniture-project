let card_btn_user = document.getElementsByClassName("for_user");
let card_btn_admin = document.getElementsByClassName("for_admin");

let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || {};

if (!loggedInUser.isAdmin) {
  document.getElementById("addNewProduct").style.display = "none";
}

let loginElement = document.getElementById("login");

if (Object.keys(loggedInUser).length !== 0) {
  loginElement.innerHTML = `Log out`;
  loginElement.addEventListener("click", function () {
    localStorage.removeItem("loggedInUser");
    location.reload();
  });
} else {
  loginElement.innerHTML = `Log In`;
  loginElement.addEventListener("click", function () {
    window.location.href = "http://127.0.0.1:5500/login/sign-in/index.html";
  });
}

let products_dom = document.getElementById("products");
let allProd = [];
let displayedProducts = 9;
let productsToAdd = 9;

const deleteProduct = (productId) => {
  const index = allProd.findIndex((prod) => prod.id === productId);
  if (index !== -1) {
    allProd.splice(index, 1);
  }
  addProductsToDom();
};

const addProductsToDom = () => {
  products_dom.innerHTML = "";

  if (allProd.length > 0) {
    allProd.slice(0, displayedProducts).forEach((prod) => {
      let new_prod = document.createElement("div");
      new_prod.classList.add("item");
      new_prod.innerHTML = `
                <img class="item_img" src="${prod.image}" alt="">
                <div class="card_text">
                    <h4>${prod.name}</h4>
                    <div class="rating">
                        <i class="star fa-solid fa-star star_done"></i>
                        <i class="star fa-solid fa-star star_done"></i>
                        <i class="star fa-solid fa-star star_done"></i>
                        <i class="star fa-regular fa-star"></i>
                        <i class="star fa-regular fa-star"></i>
                    </div>
                    <h3 class="price">${prod.price} $</h3>
                    ${
                      loggedInUser.isAdmin
                        ? `<button class="main_btn card_btn edit-btn">Edit</button><br />
                           <button class="main_btn card_btn delete-btn">Delete</button>`
                        : `<button class="main_btn card_btn">Add to Cart</button>`
                    }
                    <span id="prod_code">code: ${prod.id}</span>
                </div>
      `;

      if (loggedInUser.isAdmin) {
        let deleteButton = new_prod.querySelector(".delete-btn");
        deleteButton.addEventListener("click", () => {
          deleteProduct(prod.id);
        });

        // we should apply the Edit functoinality here
        let editButton = new_prod.querySelector(".edit-btn");
        editButton.addEventListener("click", () => {
          console.log("Edit button clicked for product ID:", prod.id);
        });
      }

      products_dom.appendChild(new_prod);
    });
  }
};

const getData = () => {
  fetch("../products.json")
    .then((response) => response.json())
    .then((data) => {
      allProd = data;
      addProductsToDom();
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};

const loadMoreProducts = () => {
  const remainingProducts = allProd.length - displayedProducts;
  if (remainingProducts > 0) {
    const productsToDisplay = Math.min(productsToAdd, remainingProducts);
    displayedProducts += productsToDisplay;
    addProductsToDom();
  }
};

document
  .querySelector(".load_more")
  .addEventListener("click", loadMoreProducts);

getData();

var names = [
    "chocolat",
    "cheese",
    "kda mena",
    "halal menthe",
    "kinder pingui",
    "Zitoune",
    "Mechoui f chbab",
    "Kebch",
    "Rolex",
  ];
  var prices = [12, 8, 7, 5, 15, 300, 4, 2, 1000];
  var descriptions = [
    "aaaa",
    "bbb",
    "vvvv",
    "cccccc",
    "chocolat",
    "cheese",
    "kda mena",
    "halal menthe",
    "kinder pingui",
  ];
  var images = ["./img/image.jpg", "/img/img.jpg"];
  
  var products = [];
  var cart = [];
  
  var displayHtml = "";
  
  for (let index = 0; index < names.length; index++) {
    const name = names[index];
    const price = prices[index];
    const description = descriptions[index];
    const image = images[index];
  
    var product = {
      id: index,
      name,
      description,
      price,
      image,
      quantity: 1,
    };
    products.push(product);
  
    /*html */
    displayHtml += `
                  <div class="col-4">
                          <div class="card mb-4 box-shadow">
                              <img class="card-img-top"
                                  src=${images[0]}
                                  />
                              <div class="card-body">
                                  <h4 class="card-title">${name}</h4>
                                  <p class="card-text">
                                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto et quos vel temporibus asperiores aliquam doloremque excepturi quam, reiciendis labore?</p>
                                  <div class="d-flex justify-content-between align-items-center">
                                      <button onclick="addToCart(${index})" style="width:160px" type="button" id="add">Add to cart</button>
                                      <p class="font-weight-bold">${price}.00 $</p>
                                  </div>
                              </div>
                          </div>
                  </div>`;
  }
  
  document.getElementById("products").innerHTML = displayHtml;
  document.getElementById("quantity").innerHTML = cart.length;
  
  function addingPrices(price, qty) {
    return price * qty;
  }
  
  function addToCart(index) {
    const currentProduct = products[index];
    var displayHTML = document.getElementById("cartItems").innerHTML;
  
    const found = cart.find((produit) => produit.id == currentProduct.id);
  
    if (found) {
      cart.forEach((produit) => {
        if (produit.id == found.id) {
          produit.quantity++;
          document.getElementById("Quantity" + produit.id).innerHTML =
            produit.quantity;
          // product.price += product.price
          // document.getElementById("Price" + produit.id).innerHTML = product.price
        }
      });
    } else {
      cart.push(currentProduct);
      displayHTML += `
                                  <tr id="prod-${currentProduct.id}">
                                      <td>${currentProduct.id}</th>
                                      <td>${currentProduct.name}</td>
                                      <td id="Quantity${currentProduct.id}">${currentProduct.quantity}</td>
                                      <td id="Price${currentProduct.id}">${currentProduct.price}</td>
                                      <td>
                                          <div onclick="removeItem(${currentProduct.id})" class="btn btn-danger">Delete</div>
                                      </td>
                              </tr>`;
      document.getElementById("cartItems").innerHTML = displayHTML;
      document.getElementById("quantity").innerHTML = cart.length;
    }
  }
  
  const form = document.getElementById("form-group");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("nameInput").value;
    const price = document.getElementById("price").value;
    const description = document.getElementById("description").value;
  
    var newProduct = {
      id: products.length,
      name,
      description,
      price,
      quantity: 1,
    };
  
    if (name == "" || description == "" || price == "") {
      alert("add content!");
    }
    products.push(newProduct);
    console.log(products);
    displayHtml += `
                  <div class="col-4">
                          <div class="card mb-4 box-shadow">
                              <img class="card-img-top"
                                  src=${images[0]}
                                  />
                              <div class="card-body">
                                  <h4 class="card-title">${name}</h4>
                                  <p class="card-text">
                                     ${description}</p>
                                  <div class="d-flex justify-content-between align-items-center">
                                      <button onclick="addToCart(${newProduct.id})" type="button" class="btn  btn-primary">Add to cart</button>
                                      <p class="font-weight-bold">${price}.00 $</p>
                                  </div>
                              </div>
                          </div>
                  </div>`;
    document.getElementById("products").innerHTML = displayHtml;
  });
  
  function removeItem(id) {
    cart = cart.filter((element) => element.id != id);
  
    if (products[id].quantity > 1) {
      products[id].quantity--;
      document.getElementById("Quantity" + products[id].id).innerHTML =
        products[id].quantity;
    } else {
      document.getElementById("prod-" + id).remove();
      document.getElementById("quantity").innerHTML = cart.length;
    }
  }
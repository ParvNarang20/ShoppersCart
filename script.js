let products = [];

// Fetch data from API
function getData() {
  fetch("https://fakestoreapi.com/products")
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      products = data;
      showProducts(products);
    })
    .catch(function(error) {
      document.getElementById("products").innerHTML = "Error loading data";
    });
}

// Show products on screen
function showProducts(data) {
  let container = document.getElementById("products");
  container.innerHTML = "";

  for (let i = 0; i < data.length; i++) {
    let item = data[i];

    let div = document.createElement("div");
    div.className = "card";

    let img = document.createElement("img");
    img.src = item.image;

    let title = document.createElement("h3");
    title.innerText = item.title;

    let price = document.createElement("p");
    price.innerText = "₹" + item.price;

    div.appendChild(img);
    div.appendChild(title);
    div.appendChild(price);

    container.appendChild(div);
  }
}

// Call function
getData();
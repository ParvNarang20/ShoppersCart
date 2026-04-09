
let products = [];

function getData() {
  fetch("https://dummyjson.com/products")
    .then(function(res) {
      return res.json();
    })
    .then(function(data) {
      products = data.products;
      showProducts(products);
    })
    .catch(function(error) {
      document.getElementById("products").innerHTML = "Failed to load data";
      console.log(error);
    });
}

function showProducts(data) {
  let container = document.getElementById("products");
  container.innerHTML = "";

  if (data.length === 0) {
    container.innerHTML = "No products found";
    return;
  }

  for (let i = 0; i < data.length; i++) {
    let item = data[i];

    let div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <img src="${item.thumbnail}">
      <h3>${item.title}</h3>
      <p>₹${item.price}</p>
    `;

    container.appendChild(div);
  }
}

document.getElementById("search").addEventListener("input", function(e) {
  let value = e.target.value.toLowerCase();

  let filtered = products.filter(function(item) {
    return item.title.toLowerCase().includes(value);
  });

  showProducts(filtered);
});

document.getElementById("filter").addEventListener("change", function(e) {
  let value = e.target.value;

  if (value === "all") {
    showProducts(products);
    return;
  }

  let filtered = products.filter(function(item) {
    return item.category.toLowerCase() === value.toLowerCase();
  });

  showProducts(filtered);
});

document.getElementById("sort").addEventListener("change", function(e) {
  let value = e.target.value;

  let sorted = [...products];

  if (value === "low") {
    sorted.sort(function(a, b) {
      return a.price - b.price;
    });
  } else if (value === "high") {
    sorted.sort(function(a, b) {
      return b.price - a.price;
    });
  }

  showProducts(sorted);
});
function loadCategories() {
  fetch("https://dummyjson.com/products/categories")
    .then(function(res) {
      return res.json();
    })
    .then(function(data) {
      let select = document.getElementById("filter");
      select.innerHTML = '<option value="all">All Categories</option>';

      let limited = data.slice(0, 5);

      limited.forEach(function(cat) {
        let name;

        if (typeof cat === "string") {
          name = cat;
        } else {
          name = cat.name;
        }

        let option = document.createElement("option");
        option.value = name;
        option.textContent = name;

        select.appendChild(option);
      });
    });
}
getData();
loadCategories();
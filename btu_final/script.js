let allProducts = [];

fetch("https://fakestoreapi.com/products")
  .then((response) => response.json())
  .then((products) => {
    allProducts = products;
    const firstGroup = products.slice(0, 8);
    const secondGroup = products.slice(8, 16);
    displayProducts(firstGroup, "products-container");
    displayProducts(secondGroup, "products-container1");
  })
  .catch((error) => console.error("Error fetching products:", error));

function displayProducts(products, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";
  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
            <img src="${product.image}" alt="Product Image">
            <h2>${product.title}</h2>
            <p><strong>Rating:</strong> ${product.rating.rate}/5</p>
            <p class="price">$${product.price}</p>
        `;
    container.appendChild(productDiv);
  });
}

document.getElementById("search-input").addEventListener("input", function () {
  const query = this.value.toLowerCase();
  const filteredProducts = allProducts.filter((product) =>
    product.title.toLowerCase().includes(query)
  );
  // Update both containers with the filtered products
  const firstGroup = filteredProducts.slice(0, 8);
  const secondGroup = filteredProducts.slice(8, 16);
  displayProducts(firstGroup, "products-container");
  displayProducts(secondGroup, "products-container1");
});

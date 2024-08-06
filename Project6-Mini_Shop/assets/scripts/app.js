const productList = {
  products: [
    {
      title: "Yastık",
      imageUrl:
        "https://hushblankets.com/cdn/shop/products/Pillow_Cloud_Mattress_Graph-Iced-_Product_JaredLeckie_11-10-23_1_2048x.jpg?v=1720548762",
      description: "Rahat bir yastık",
      price: 59.99,
    },
    {
      title: "Halı",
      imageUrl:
        "https://ideacdn.net/idea/kc/79/myassets/blogs/blog-42.jpg?revision=1709728323",
      description: "Şık bir halı",
      price: 1299.0,
    },
  ],

  render() {
    const renderHook = document.getElementById("app");
    const prodList = document.createElement("ul");
    prodList.className = "product-list";
    for (const prod of this.products) {
      const prodEl = document.createElement("li");
      prodEl.className = "product-item";
      prodEl.innerHTML = `
        <div>
          <img src="${prod.imageUrl}" alt="${prod.title}" >
          <div class="product-item__content">
            <h2>${prod.title}</h2>
            <h3>\₺${prod.price}</h3>
            <p>${prod.description}</p>
            <button>Sepete Ekle</button>
          </div>
        </div>
      `;
      prodList.append(prodEl);
    }
    renderHook.append(prodList);
  },
};

productList.render();

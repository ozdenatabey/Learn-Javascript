class Product {
  // title = "DEFAULT";
  // imageUrl;
  // description;
  // price;

  constructor(title, image, desc, price) {
    this.title = title;
    this.imageUrl = image;
    this.description = desc;
    this.price = price;
  }
}

class ProductItem {
  constructor(product) {
    this.product = product;
  }

  render() {
    const prodEl = document.createElement("li");
    prodEl.className = "product-item";
    prodEl.innerHTML = `
        <div>
          <img src="${this.product.imageUrl}" alt="${this.product.title}" >
          <div class="product-item__content">
            <h2>${this.product.title}</h2>
            <h3>\₺${this.product.price}</h3>
            <p>${this.product.description}</p>
            <button>Sepete Ekle</button>
          </div>
        </div>
      `;
    return prodEl;
  }
}

class ProductList {
  products = [
    new Product(
      "Yastık",
      "https://hushblankets.com/cdn/shop/products/Pillow_Cloud_Mattress_Graph-Iced-_Product_JaredLeckie_11-10-23_1_2048x.jpg?v=1720548762",
      "Rahat bir yastık",
      59.99
    ),
    new Product(
      "Halı",
      "https://ideacdn.net/idea/kc/79/myassets/blogs/blog-42.jpg?revision=1709728323",
      "Şık bir halı",
      1299.0
    ),
  ];

  constructor() {}

  render() {
    const renderHook = document.getElementById("app");
    const prodList = document.createElement("ul");
    prodList.className = "product-list";
    for (const prod of this.products) {
      const productItem = new ProductItem(prod);
      const prodEl = productItem.render();
      prodList.append(prodEl);
    }
    renderHook.append(prodList);
  }
}

const productList = new ProductList();
productList.render();

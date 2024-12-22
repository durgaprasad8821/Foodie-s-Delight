import { products,cartItem } from "./data.js";

const searchInput = document.getElementById('search');
const categoryFilter = document.getElementById('category-filter');
const productContainer = document.getElementById('product-container');

window.toggleMenu = () => {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('show');
}



// Populate category filter dynamically
const categories = ["All", ...new Set(products.map(product => product.category))];
categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
});

// Function to render products
const renderProducts = (filterItem) => {
    const productCard = document.createElement('div');
     productCard.className = "totalItem"
    var items = '';

    filterItem.forEach(product => {
        items += `
        <div class = "product-card">
            <img src="${product.imageUrl}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>Category: ${product.category}</p>
            <div class="rating">Rating: ⭐${product.rating}</div>
            <div class="price">Price: $${product.price.toFixed(2)}</div>
            <div class="quantity-controls">
                <button onclick="decrementQuantity(${product.id})">-</button>
                <span id="quantity-${product.id}">1</span>
                <button onclick="incrementQuantity(${product.id})">+</button>
            </div>
            <button class="add-cart" onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
        `; 
    });
    productCard.innerHTML = items;
    productContainer.innerHTML = "";
    productContainer.appendChild(productCard);
   
};

const quantities = {}; // To track quantities of products

            window.incrementQuantity =(id)=>    {
                const quantityElement = document.getElementById(`quantity-${id}`);
                const currentQuantity = parseInt(quantityElement.textContent);
                quantityElement.textContent = currentQuantity + 1;
            };

        

        window.decrementQuantity = (id) => {
            const quantityElement = document.getElementById(`quantity-${id}`);
            const currentQuantity = parseInt(quantityElement.textContent);
            if (currentQuantity > 1) {
                quantityElement.textContent = currentQuantity - 1;
            }
        };

        window.addToCart = (id) => {
            const quantityElement = document.getElementById(`quantity-${id}`);
            const quantity = parseInt(quantityElement.textContent);
            alert(`Added ${quantity} of ${products.find(p => p.id === id).name} to cart!`);
            let data = {productId : 0,
                productsCount : 0
                }
            data.productId = id;
            data.productsCount = quantity;
            cartItem.push(data);
            localStorage.setItem('data' , JSON.stringify(cartItem));
            console.log(cartItem);
        };

// Initial render
renderProducts(products);

// Handle search and filter
const filterProducts = () => {
    const searchQuery = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery);
        const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });
    renderProducts(filteredProducts);
};

searchInput.addEventListener('input', filterProducts);
categoryFilter.addEventListener('change', filterProducts);
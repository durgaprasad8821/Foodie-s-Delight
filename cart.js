import { cartItem } from "./data.js";
import { products } from "./data.js";


const button = document.querySelector('.checkout-button');
const canvas = document.querySelector('#confetti');

const jsConfetti = new JSConfetti();

button.addEventListener('click' , ()=>{
    jsConfetti.addConfetti();  
    button.textContent = "Completed" 
})


const filterData =JSON.parse(localStorage.getItem('data')).map((key) =>{
    const productId = products.find(item => item.id === key.productId);
    if(productId){
        return{
            ...productId,
            cartQuantity : key.productsCount,
            total : (productId.price * key.productsCount) .toFixed(2)
        };
    }
    return null
}).filter(item => item !== null);

window.toggleMenu = () => {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('show');
}

const addItem = () =>{
    const cartItemBlock = document.querySelector('.cart-item');
    const totalValue = document.getElementById('grand-total');
    var itemData = '';
    var totalSum = 0;
    filterData.map((data) => {

        itemData += `
        <div class="item-block">
            <div>
            <img src=${data.imageUrl} alt="Product">
            </div>
            <div class="product-name">${data.name}</div>
            <div class="quantity-controls">
                <button onclick="decrementItem(${data.id})">-</button>
                <span id="cart-quantity-1">${data.cartQuantity}</span>
                <button onclick="incrementItem(${data.id})">+</button>
            </div>
            <div class ="price">
            <div id="cart-total-1" class="cart-total">${parseInt(data.price * data.cartQuantity)}</div>
            </div>
        </div>
    ` ;
    totalSum += (data.price * data.cartQuantity);

        
});
    cartItemBlock.innerHTML = itemData;
    totalValue.textContent = parseInt(totalSum);
}
addItem();

 

window.incrementItem = (id) => {
    const product = filterData.find(item => item.id === id);
    if (product) {
        product.cartQuantity++;
        addItem();
    }
};

window.decrementItem = (id) => {
    const product = filterData.find(item => item.id === id);
    if (product && product.cartQuantity > 1) {
        product.cartQuantity--;
        addItem();
    }
};
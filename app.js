import { foodItems } from "./data.js";

window.toggleMenu = () => {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('show');
}

const conData = foodItems.slice(0,4);
function products(){
    const product = document.querySelector('.product-grid');
    let ProductCards = ""; 
    conData.map((key) =>{
        ProductCards += `<div class="product-card">
                           <img src= ${key.url} alt=${key.name}>
                           <h3> ${key.name}</h3>
                           <p>${key.price}</p>
                       </div>` ;
        
    })
    product.innerHTML = ProductCards;
    
}

products()

 


  

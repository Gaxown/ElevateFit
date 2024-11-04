// product-details.js
export const addToCartLocalStorage = () => {
    const calculatedTotalPrice = parseFloat(totalPrice.innerHTML.slice(1)) + (quantity.value * productDetails.price);
    totalPrice.innerHTML = `$${calculatedTotalPrice.toFixed(2)}`;
    
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const newTotalArticles = parseInt(totalArticles) + parseInt(quantity.value);
    localStorage.setItem('totalArticles', newTotalArticles);    
    totalArticlesSpan.innerHTML = `(${newTotalArticles})`;
    
    cart.push({ id: productId, quantity: quantity.value });
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('totalPrice', calculatedTotalPrice.toFixed(2));
};

// The rest of your code remains the same, but make sure to remove the global assignment
window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = localStorage.getItem('productId');

    // Product Price
    const quantity = document.querySelector("#quantity");
    const price = document.querySelector("#productPrice");
    const totalPrice = document.querySelector("#totalPrice");
    const addToCartBtn = document.querySelector('.addToCart');
    const totalArticlesSpan = document.querySelector('#totalArticles');
    
    const previousCartPrice = localStorage.getItem('totalPrice') ? parseFloat(localStorage.getItem('totalPrice')).toFixed(2) : 0;    
    const totalArticles = localStorage.getItem('totalArticles') ? parseInt(localStorage.getItem('totalArticles')) : 0;

    totalPrice.innerHTML = `$${previousCartPrice}`;
    totalArticlesSpan.innerHTML = `(${totalArticles})`;

    // Retrieve product data from local storage
    const productData = JSON.parse(localStorage.getItem("productDetails"));
    const productDetails = productData.find(product => product.id == productId);

    // Display product details on the page
    if (productDetails) {
        document.querySelector('#productTitle').textContent = productDetails.title;
        document.querySelector('#productPrice').textContent = `$${productDetails.price}`;
        document.querySelector('#productImage').src = document.querySelector('#img-0').src = productDetails.img;

        const imgsNum = 4;
        for (let index = 1; index <= imgsNum; index++) {
            const id = `#img-${index}`;
            document.querySelector(id).src = `./images/Nike/product ${productId}/${index}.png`;
        }
    } else {
        console.error('Product not found');
    }

    // Event Listeners
    quantity.addEventListener('input', (e) => {
        const calculatedPrice = (quantity.value * productDetails.price).toFixed(2);
        price.innerHTML = `$${calculatedPrice}`;
    });

    addToCartBtn.addEventListener('click', addToCartLocalStorage);
};
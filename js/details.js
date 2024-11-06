// product-details.html
window.onload = function() {
    const productId = localStorage.getItem('productId');
    console.log(productId)

    // Product Price
    let quantity = document.querySelector("#quantity");
    let price = document.querySelector("#productPrice");
    let totalPrice = document.querySelector("#totalPrice");
    let addToCartBtn = document.querySelector('.addToCart');
    let totalArticlesSpan = document.querySelector('#totalArticles');
    let previousCartPrice = localStorage.getItem('totalPrice') ? parseFloat(localStorage.getItem('totalPrice')).toFixed(2) : 0    
    let totalArticles = localStorage.getItem('totalArticles') ? parseInt(localStorage.getItem('totalArticles')) : 0;

    totalPrice.innerHTML = `$${previousCartPrice}`;
    totalArticlesSpan.innerHTML = `(${totalArticles})`;

    const productData = JSON.parse(localStorage.getItem("productDetails"));
    const productDetails = productData.find(product => product.id == productId);
    console.log(productDetails);

    if (productDetails) {
        document.querySelector('#productTitle').textContent = productDetails.title;
        document.querySelector('#productPrice').textContent = `$${productDetails.price}`;
        document.querySelector('#productImage').src = document.querySelector('#img-0').src = productDetails.img;

        let imgsNum = 4;
        for (let index = 1; index <= imgsNum; index++) {
            let id = `#img-${index}`;
            document.querySelector(id).src = `./images/Nike/product ${productId}/${index}.png`;
        }

        let cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const cartItem = cart.find(item => item.id == productId);
        if (cartItem) {
            quantity.value = cartItem.quantity;
            price.innerHTML = `$${cartItem.quantity * productDetails.price}`; 
        } else {
            quantity.value = 1; 
        }

    } else {
        console.error('Product not found');
    }

    quantity.addEventListener('input', (e) => {
        price.innerHTML = `$${quantity.value * productDetails.price}`;
    });

const addToCartLocalStorage = () => {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const item = cart.find(item => item.id == productId);
    let quantityValue = parseInt(quantity.value);
    let productPrice = productDetails.price;

    let newTotalPrice = quantityValue * productPrice;

    let currentTotalPrice = parseFloat(localStorage.getItem('totalPrice')) || 0;

    if (item) {
        if (item.quantity !== quantityValue) {
            totalArticles -= parseInt(item.quantity); 
            totalArticles += quantityValue; 
            
            currentTotalPrice -= (item.quantity * productPrice);
            item.quantity = quantityValue;

            currentTotalPrice += newTotalPrice;

            localStorage.setItem('cart', JSON.stringify(cart));
            localStorage.setItem('totalArticles', totalArticles);
            localStorage.setItem('totalPrice', currentTotalPrice.toFixed(2));
            totalPrice.innerHTML = `$${currentTotalPrice.toFixed(2)}`; 
        } else {
            return;
        }
    } else {
        cart.push({ id: productId, quantity: quantityValue.toString() });
        totalArticles += quantityValue; 

        // Update local storage
        currentTotalPrice += newTotalPrice; 
        localStorage.setItem('cart', JSON.stringify(cart));
        localStorage.setItem('totalArticles', totalArticles);
        localStorage.setItem('totalPrice', currentTotalPrice.toFixed(2));
        totalPrice.innerHTML = `$${currentTotalPrice.toFixed(2)}`; 
    }

    totalArticlesSpan.innerHTML = `(${totalArticles})`;
};

    addToCartBtn.addEventListener('click', addToCartLocalStorage);
};
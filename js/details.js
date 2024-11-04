// product-details.html
/**
 * 
 
window.onload = function() {
    const productId = localStorage.getItem('productId');
    console.log(productId)

    // Product Price
    let quantity = document.querySelector("#quantity");
    let price = document.querySelector("#productPrice");
    let totalPrice = document.querySelector("#totalPrice");
    let addToCartBtn = document.querySelector('.addToCart');
    let totalArticlesSpan = document.querySelector('#totalArticles');
    let previousCartPrice =localStorage.getItem('totalPrice') ? parseFloat(localStorage.getItem('totalPrice')).toFixed(2) : 0    
    let totalArticles = localStorage.getItem('totalArticles') ? parseInt(localStorage.getItem('totalArticles')) : 0
    // console.log(previousCartPrice)
    totalPrice.innerHTML = `$${previousCartPrice}`
    totalArticlesSpan.innerHTML = `(${totalArticles})`
    // console.log(totalArticles)

    // Retrieve product data from local storage
    const productData = JSON.parse(localStorage.getItem("productDetails"));
    const productDetails = productData.find(product => product.id == productId);
    console.log(productDetails)

    // Display product details on the page
    if (productDetails) {
        document.querySelector('#productTitle').textContent = productDetails.title;
        document.querySelector('#productPrice').textContent = `$${productDetails.price}`;
        // document.querySelector('#productRating').textContent = `${productDetails.stars} stars`;
        document.querySelector('#productImage').src = document.querySelector('#img-0').src = productDetails.img;
        let imgsNum = 4
        for (let index = 1; index <= imgsNum; index++) {
            let id = `#img-${index}`
            document.querySelector(id).src = `./images/Nike/product ${productId}/${index}.png`;
        }

        
    } else {
        console.error('Product not found');
    }

// Event Listeners

quantity.addEventListener('input', (e) => {
  price.innerHTML = `$${quantity.value*productDetails.price}`;
//   totalPrice.innerHTML = `$${parseFloat(totalPrice.innerHTML.slice(1)) + parseFloat(quantity.value*productDetails.price)}`;
});

const addToCartLocalStorage = () => {
    totalPrice.innerHTML = `$${parseFloat(totalPrice.innerHTML.slice(1)) + parseFloat(quantity.value*productDetails.price)}`;
    // 
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    // let totalArticles = JSON.parse(localStorage.getItem('totalArticles'));
    localStorage.setItem('totalArticles', parseInt(totalArticles) + parseInt(quantity.value))    
    totalArticlesSpan.innerHTML = `(${localStorage.getItem('totalArticles')})`
    const item  = cart.find(item => item.id == productId)
    if (item)
        item.quantity = quantity.value
    else
        cart.push({ id: productId, quantity: quantity.value });
    localStorage.setItem('cart', JSON.stringify(cart));
    // console.log(parseFloat(totalPrice.innerHTML.slice(1)))
    localStorage.setItem('totalPrice', parseFloat(totalPrice.innerHTML.slice(1)));
    // console.log(totalArticlesSpan.innerHTML)
    // localStorage.setItem('totalArticles', parseInt(totalArticlesSpan.innerHTML.slice(1, -1)));
}

addToCartBtn.addEventListener('click', addToCartLocalStorage)

};
*/
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

    // Retrieve product data from local storage
    const productData = JSON.parse(localStorage.getItem("productDetails"));
    const productDetails = productData.find(product => product.id == productId);
    console.log(productDetails);

    // Display product details on the page
    if (productDetails) {
        document.querySelector('#productTitle').textContent = productDetails.title;
        document.querySelector('#productPrice').textContent = `$${productDetails.price}`;
        document.querySelector('#productImage').src = document.querySelector('#img-0').src = productDetails.img;

        let imgsNum = 4;
        for (let index = 1; index <= imgsNum; index++) {
            let id = `#img-${index}`;
            document.querySelector(id).src = `./images/Nike/product ${productId}/${index}.png`;
        }

        // Check if the product is already in the cart and set the quantity
        let cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const cartItem = cart.find(item => item.id == productId);
        if (cartItem) {
            quantity.value = cartItem.quantity; // Set the quantity input to the current quantity in the cart
            price.innerHTML = `$${cartItem.quantity * productDetails.price}`; // Update price based on cart quantity
        } else {
            quantity.value = 1; // Default to 1 if not in cart
        }

    } else {
        console.error('Product not found');
    }

    // Event Listeners
    quantity.addEventListener('input', (e) => {
        price.innerHTML = `$${quantity.value * productDetails.price}`;
    });

const addToCartLocalStorage = () => {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const item = cart.find(item => item.id == productId);
    let quantityValue = parseInt(quantity.value);
    let productPrice = productDetails.price;

    // Calculate total price based on quantity
    let newTotalPrice = quantityValue * productPrice;

    // Retrieve the current total price from local storage
    let currentTotalPrice = parseFloat(localStorage.getItem('totalPrice')) || 0;

    if (item) {
        // If the item exists in the cart, check if the quantity has changed
        if (item.quantity !== quantityValue) {
            // Update total articles
            totalArticles -= parseInt(item.quantity); // Remove old quantity from total
            totalArticles += quantityValue; // Add new quantity to total
            
            // Update item quantity in cart
            currentTotalPrice -= (item.quantity * productPrice); // Subtract the old total price contribution
            item.quantity = quantityValue; // Update quantity

            // Add new total price contribution
            currentTotalPrice += newTotalPrice;

            // Update local storage
            localStorage.setItem('cart', JSON.stringify(cart));
            localStorage.setItem('totalArticles', totalArticles);
            localStorage.setItem('totalPrice', currentTotalPrice.toFixed(2));
            totalPrice.innerHTML = `$${currentTotalPrice.toFixed(2)}`; // Update UI
        } else {
            // If the quantity hasn't changed, do nothing
            return;
        }
    } else {
        // If the item does not exist, add it to the cart
        cart.push({ id: productId, quantity: quantityValue.toString() });
        totalArticles += quantityValue; // Increment total articles

        // Update local storage
        currentTotalPrice += newTotalPrice; // Add the new item's total price contribution
        localStorage.setItem('cart', JSON.stringify(cart));
        localStorage.setItem('totalArticles', totalArticles);
        localStorage.setItem('totalPrice', currentTotalPrice.toFixed(2));
        totalPrice.innerHTML = `$${currentTotalPrice.toFixed(2)}`; // Update UI
    }

    // Update the UI for total articles
    totalArticlesSpan.innerHTML = `(${totalArticles})`;
};

    addToCartBtn.addEventListener('click', addToCartLocalStorage);
};
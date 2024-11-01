// product-details.html
window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = localStorage.getItem('productId');

    // Product Price
    quantity = document.querySelector("#quantity");
    price = document.querySelector("#productPrice");
    totalPrice = document.querySelector("#totalPrice");
    addToCartBtn = document.querySelector('.addToCart');
    totalArticlesSpan = document.querySelector('#totalArticles');
    previousCartPrice =localStorage.getItem('totalPrice') ? parseFloat(localStorage.getItem('totalPrice')).toFixed(2) : 0    
    totalArticles = localStorage.getItem('totalArticles') ? parseInt(localStorage.getItem('totalArticles')) : 0
    console.log(previousCartPrice)
    totalPrice.innerHTML = `$${previousCartPrice}`
    totalArticlesSpan.innerHTML = `(${totalArticles})`

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
        imgsNum = 4
        for (index = 1; index <= imgsNum; index++) {
            id = `#img-${index}`
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

addToCartBtn.addEventListener('click', () => {
    // 
    totalPrice.innerHTML = `$${parseFloat(totalPrice.innerHTML.slice(1)) + parseFloat(quantity.value*productDetails.price)}`;
    // 
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    // let totalArticles = JSON.parse(localStorage.getItem('totalArticles'));
    localStorage.setItem('totalArticles', parseInt(totalArticles) + parseInt(quantity.value))    
    totalArticlesSpan.innerHTML = `(${localStorage.getItem('totalArticles')})`
    cart.push({ id: productId, quantity: quantity.value });
    localStorage.setItem('cart', JSON.stringify(cart));
    // console.log(parseFloat(totalPrice.innerHTML.slice(1)))
    localStorage.setItem('totalPrice', parseFloat(totalPrice.innerHTML.slice(1)));
    console.log(totalArticlesSpan.innerHTML)
    // localStorage.setItem('totalArticles', parseInt(totalArticlesSpan.innerHTML.slice(1, -1)));
})

};

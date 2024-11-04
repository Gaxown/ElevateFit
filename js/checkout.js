document.addEventListener('DOMContentLoaded', () => {
    // Retrieve checkout data from local storage
    const products = JSON.parse(localStorage.getItem('productDetails'));
    const checkoutData = JSON.parse(localStorage.getItem('checkoutData'));

    if (checkoutData) {
        const cartItems = checkoutData.cart;
        const totalPrice = checkoutData.totalPrice;
        const totalArticles = checkoutData.totalArticles;
        const tax = parseFloat(checkoutData.tax);

        // Populate order summary
        const totalArticlesSpan = document.querySelector('#totalArticles');
        const orderSummary = document.querySelector('.order-summary');
        let orderDetails = '';

        cartItems.forEach(item => {
            const product = products.find(p => p.id.toString() === item.id);
            if (product) {
                const itemTotal = (parseFloat(product.price) * parseInt(item.quantity)).toFixed(2);
                orderDetails += `<p>${product.title} x ${item.quantity} <span>$${itemTotal}</span></p>`;
            }
        });

        // Update order summary with cart items
        totalArticlesSpan.innerHTML = `(${totalArticles})`
        orderSummary.innerHTML = `
            <h2>Your order</h2>
            ${orderDetails}
            <p>Subtotal <span>$${totalPrice.toFixed(2)}</span></p>
            <p>Tax <span>$${tax.toFixed(2)}</span></p>
            <p>Shipping <span>Free shipping</span></p>
            <p>tax <span>$${(totalPrice + tax).toFixed(2)}</span></p>            
            <div class="payment-methods">
                <label><input type="radio" name="payment-method" checked /> Direct Bank Transfer</label>
                <p>Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.</p>
                <label><input type="radio" name="payment-method" /> Cash on Delivery</label>
                <label><input type="radio" name="payment-method" /> Paypal</label>
            </div>
            <div class="place-order">
                <button id="placeOrderButton">Place Order</button>
            </div>
        `;

        // Handle Place Order button click
        document.getElementById('placeOrderButton').addEventListener('click', () => {
            // Logic to handle order placement can be added here
            alert('Order placed successfully!'); // Placeholder for order placement logic
            localStorage.removeItem('checkoutData'); // Clear checkout data from local storage
            window.location.href = './index.html'; // Redirect to home page after placing order
        });
    } else {
        console.error('No checkout data found.');
        // Optionally redirect back to the cart or home page if no data is found
        window.location.href = './cart.html'; // Redirect to cart page if no data
    }
});
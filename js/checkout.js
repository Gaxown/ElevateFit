document.addEventListener('DOMContentLoaded', () => {

    const products = JSON.parse(localStorage.getItem('productDetails'));
    const checkoutData = JSON.parse(localStorage.getItem('checkoutData'));

    if (checkoutData) {
        const cartItems = checkoutData.cart;
        const totalPrice = checkoutData.totalPrice;
        const totalArticles = checkoutData.totalArticles;
        const tax = parseFloat(checkoutData.tax);

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

        document.getElementById('placeOrderButton').addEventListener('click', () => {
            alert('Order placed successfully!'); 
            localStorage.removeItem('checkoutData'); 
            window.location.href = './index.html'; 
        });
    } else {
        console.error('No checkout data found.');
        
        window.location.href = './cart.html';
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const products = JSON.parse(localStorage.getItem('productDetails')) || []; 
    const wishlistItems = JSON.parse(localStorage.getItem('wishlistItems')) || [];
    const cart = JSON.parse(localStorage.getItem('cart')) || []; 


    const renderWishlist = () => {
        const wishlistContainer = document.querySelector('#wishlist-container');
        wishlistContainer.innerHTML = ''; 
        if  (wishlistItems.length == 0) 
            document.querySelector('.empty-wishlist').classList.remove('none')

        wishlistItems.forEach(itemId => {
            const product = products.find(product => product.id == itemId);
            if (product) {
                wishlistContainer.innerHTML += `
                    <div class="wishlist-item">
                        <img src="${product.img}" alt="${product.title}" class="wishlist-item-image">
                        <div class="wishlist-item-details">
                            <h2 class="wishlist-item-title">${product.title}</h2>
                            <p class="wishlist-item-price">$${product.price.toFixed(2)}</p>
                            <button class="remove-button" data-id="${product.id}">Remove from Wishlist</button>
                            <button class="buy-button" data-id="${product.id}">Buy Now</button>
                        </div>
                    </div>`;
            }
        });

        document.querySelectorAll('.remove-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = e.target.getAttribute('data-id');
                removeFromWishlist(productId);
            });
        });

        document.querySelectorAll('.buy-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = e.target.getAttribute('data-id');
                addToCart(productId);
            });
        });
    };

    const removeFromWishlist = (productId) => {
        const updatedWishlist = wishlistItems.filter(id => id != productId);
        localStorage.setItem('wishlistItems', JSON.stringify(updatedWishlist));

        wishlistItems.length = 0; 
        wishlistItems.push(...updatedWishlist); 
        renderWishlist();
    };

    const addToCart = (productId) => {
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity = (parseInt(existingItem.quantity) + 1).toString();
        } else {
            cart.push({ id: productId, quantity: "1" });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
    };

    renderWishlist();
});
document.addEventListener('DOMContentLoaded', () => {
    // Retrieve product details and wishlist items from localStorage
    const products = JSON.parse(localStorage.getItem('productDetails')) || []; // Ensure products is an array
    const wishlistItems = JSON.parse(localStorage.getItem('wishlistItems')) || [];
    const cart = JSON.parse(localStorage.getItem('cart')) || []; // Retrieve cart items

    // Function to render wishlist items
    const renderWishlist = () => {
        const wishlistContainer = document.querySelector('#wishlist-container');
        wishlistContainer.innerHTML = ''; // Clear existing content
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
                    </div>
                `;
            }
        });

        // Add event listeners for remove buttons
        document.querySelectorAll('.remove-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = e.target.getAttribute('data-id');
                removeFromWishlist(productId);
            });
        });

        // Add event listeners for buy buttons
        document.querySelectorAll('.buy-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = e.target.getAttribute('data-id');
                addToCart(productId);
            });
        });
    };

    // Function to remove an item from the wishlist
    const removeFromWishlist = (productId) => {
        // Update the wishlist items in localStorage
        const updatedWishlist = wishlistItems.filter(id => id != productId);
        localStorage.setItem('wishlistItems', JSON.stringify(updatedWishlist));

        // Update the wishlistItems variable to reflect the change
        wishlistItems.length = 0; // Clear the current array
        wishlistItems.push(...updatedWishlist); // Push the updated items back

        // Re-render the wishlist
        renderWishlist();
    };

    // Function to add an item to the cart
    const addToCart = (productId) => {
        // Check if the item is already in the cart
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            // If the item exists, increase the quantity
            existingItem.quantity = (parseInt(existingItem.quantity) + 1).toString();
        } else {
            // If the item does not exist, add it with quantity 1
            cart.push({ id: productId, quantity: "1" });
        }

        // Update localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        // alert('Item added to cart!'); // Optional: Notify the user
    };

    // Initial render of the wishlist
    renderWishlist();
});
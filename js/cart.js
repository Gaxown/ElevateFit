products = JSON.parse(localStorage.getItem('productDetails'))
cart = JSON.parse(localStorage.getItem('cart') || '[]')
totalPrice = parseFloat(JSON.parse(localStorage.getItem('totalPrice')))

cartHTML = document.querySelector('#cart')
subTotalHTML = document.querySelector('#subTotal')
totalPriceHTML = document.querySelector('#totalPrice')
taxHTML = document.querySelector('#tax')

const idArray = cart.map(product => product.id)
const idSet = new Set(idArray)
const cartProducts = products.filter(product => idSet.has(product.id.toString()))

let index = 0
let tax = parseFloat(taxHTML.textContent.slice(1))
cartProducts.forEach(product => {
    let quantity = parseInt(cart[index++].quantity)
    cartHTML.innerHTML += 
    `<div class="wishlist-item">
                        <img src="${product.img}" alt="${product.title}" class="wishlist-item-image">
                        <div class="wishlist-item-details">
                            <h2 class="wishlist-item-title">${product.title}</h2>
                            <p class="wishlist-item-price">$${product.price.toFixed(2)}</p>
                            <button class="remove-button" data-id="${product.id}">Remove from Cart</button>
                            <input type="number" value="${quantity}">
                            <p>$${(parseFloat(product.price) * quantity).toFixed(2)}</p>
                        </div>
                    </div>`
});

subTotalHTML.textContent = `$${totalPrice.toFixed(2)}`
totalPriceHTML.textContent = `$${(totalPrice + tax).toFixed(2)}`
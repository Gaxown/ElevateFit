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
    cartHTML.innerHTML += `
    <tr>
        <td>
            <img alt="${product.title}" height="100" src=${product.img} width="100">
            <div>
                ${product.title}
                <br>
                Price: $${product.price.toFixed(2)}
                <br>
                <span class="remove">Remove</span>
            </div>
        </td>
        <td>
            <input type="number" value="${quantity}">
        </td>
        <td>$${(parseFloat(product.price) * quantity).toFixed(2)}</td>
    </tr>`
});

subTotalHTML.textContent = `$${totalPrice.toFixed(2)}`
totalPriceHTML.textContent = `$${(totalPrice + tax).toFixed(2)}`
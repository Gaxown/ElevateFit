/** */
let products = localStorage.getItem('productDetails')
let totalPrice = localStorage.getItem('totalPrice') ? parseFloat(localStorage.getItem('totalPrice')).toFixed(2) : 0
let previousCartPrice = localStorage.getItem('totalPrice') ? totalPrice : 0
let totalArticles = parseInt(localStorage.getItem('totalArticles')) || 0; 
let cartItems = JSON.parse(localStorage.getItem('cart') || '[]')


var ProductImg = document.querySelector("#productImage");
var SmallImgs = document.querySelectorAll(".small-img"); 
SmallImgs.forEach(img => {
  img.addEventListener('mouseover', (e) => {
    ProductImg.src = e.target.src 
  }) 
})
document.querySelector('ul.menu-bar').addEventListener('click', (e) => {
    window.location.href = "/cart.html"
})


document.querySelector('#totalPrice').innerHTML = `£ ${totalPrice}`
document.querySelector('#totalArticles').innerHTML = ` (${totalArticles})`
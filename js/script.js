// JS for Single product detail

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
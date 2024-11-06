
const data = '[{"id":1,"img":"http://127.0.0.1:5503/images/Nike/product%201/product.png","title":"Red Printed T-shirt","categories":["Men", "Airforce"],"price":250,"stars":2.5},{"id":2,"img":"http://127.0.0.1:5503/images/Nike/product%202/product.png","title":"TEST","categories":["Women", "Dunk"],"price":100,"stars":4.5},{"id":3,"img":"http://127.0.0.1:5503/images/Nike/product%203/product.png","title":"Red Printed T-shirt","categories":["Men", "Pegasus"],"price":200,"stars":4.5},{"id":4,"img":"http://127.0.0.1:5503/images/Nike/product%204/product.png","title":"Red Printed T-shirt","categories":["Women", "Airforce"],"price":1459,"stars":4.5},{"id":5,"img":"http://127.0.0.1:5503/images/Nike/product%205/product.png","title":"Red Printed T-shirt","categories":["Men", "Dunk"],"price":1119,"stars":4},{"id":6,"img":"http://127.0.0.1:5503/images/Nike/product%206/product.png","title":"Red Printed T-shirt","categories":["Men", "Pegasus"],"price":750,"stars":4},{"id":7,"img":"http://127.0.0.1:5503/images/Nike/product%207/product.png","title":"Red Printed T-shirt","categories":["Women", "Airforce"],"price":460,"stars":3.5},{"id":8,"img":"http://127.0.0.1:5503/images/Nike/product%208/product.png","title":"Red Printed T-shirt","categories":["Men", "Dunk"],"price":1299,"stars":4.5},{"id":9,"img":"http://127.0.0.1:5503/images/Nike/product%209/product.png","title":"Red Printed T-shirt","categories":["Men", "Pegasus"],"price":200,"stars":4},{"id":10,"img":"http://127.0.0.1:5503/images/Nike/product%2010/product.png","title":"Red Printed T-shirt","categories":["Men", "Airforce"],"price":430,"stars":4},{"id":11,"img":"http://127.0.0.1:5503/images/Nike/product%2011/product.png","title":"Red Printed T-shirt","categories":["Men", "Dunk"],"price":600,"stars":3.5},{"id":12,"img":"http://127.0.0.1:5503/images/Nike/product%2012/product.png","title":"Red Printed T-shirt","categories":["Men", "Pegasus"],"price":959,"stars":4.5}]'

localStorage.setItem("productDetails", data)




document.querySelector('#totalPrice').innerHTML = `$${previousCartPrice}`
document.querySelector('#totalArticles').innerHTML = `(${totalArticles})`



/** */


getSortingParameter = () => {
    option = document.querySelector('#filter')
    filter = 'default'
    if (option.value == 'Sort by Reviews') filter = 'reviews'
    if (option.value == 'Sort by Price') filter = 'price'
    return filter
}

getPriceRange = () => {
    minPriceInput = document.querySelector('.min-input')
    maxPriceInput = document.querySelector('.max-input')
    minPrice = minPriceInput.value
    maxPrice = maxPriceInput.value
    return  {min:minPrice, max:maxPrice}

}

getCategory = () => {
    return document.querySelector('.categories li.active').textContent
}


totalArticles = parseInt(localStorage.getItem('totalArticles')) || 0;
cartItems = JSON.parse(localStorage.getItem('cart')) || [];

const addToCartHandling = () => {
    const buyButtons = document.querySelectorAll('.buy');
    const removeButtons = document.querySelectorAll('.remove');
    const bottomElements = document.querySelectorAll('.bottom');

    totalPrice = parseFloat(localStorage.getItem('totalPrice')) || 0;
    totalArticles = parseInt(localStorage.getItem('totalArticles')) || 0;

    buyButtons.forEach((buyButton, index) => {
        buyButton.addEventListener('click', () => {
            bottomElements[index].classList.add('clicked');
            const product = products[index];
            const productId = product.id;

            totalPrice += parseFloat(product.price);

            const cartItem = cartItems.find(item => item.id == productId);
            if (cartItem) {
                let quantity = parseInt(cartItem.quantity) + 1;
                cartItem.quantity = quantity.toString();
            } else {
                cartItems.push({ id: productId.toString(), quantity: '1' });
            }

            // Update total articles
            totalArticles++;
            updateUI(totalArticles, totalPrice); // Update UI with new totals

            // Store updated values in local storage
            saveToLocalStorage(totalPrice, totalArticles, cartItems);
        });
    });

    removeButtons.forEach((removeButton, index) => {
        removeButton.addEventListener('click', () => {
            bottomElements[index].classList.remove('clicked');
            const product = products[index]; 
            const cartItemIndex = cartItems.findIndex(item => item.id == product.id); 

            if (cartItemIndex !== -1) {
                const cartItem = cartItems[cartItemIndex]; 
                const itemPrice = parseFloat(product.price);
                const itemQuantity = parseInt(cartItem.quantity);

                
                totalPrice -= itemPrice * itemQuantity; 
                totalArticles -= itemQuantity;

                cartItems.splice(cartItemIndex, 1); 
            }

            
            totalPrice = Math.max(totalPrice, 0);
            totalArticles = Math.max(totalArticles, 0);

            updateUI(totalArticles, totalPrice); 

            saveToLocalStorage(totalPrice, totalArticles, cartItems);
        });
    });
}

const updateUI = (totalArticles, totalPrice) => {
    document.querySelector('#totalArticles').innerHTML = `(${totalArticles})`;
    document.querySelector('#totalPrice').innerHTML = `$${totalPrice.toFixed(2)}`; 
}

const saveToLocalStorage = (totalPrice, totalArticles, cartItems) => {
    localStorage.setItem('totalPrice', totalPrice.toFixed(2)); 
    localStorage.setItem('totalArticles', totalArticles.toString()); 
    localStorage.setItem('cart', JSON.stringify(cartItems)); 
}

addToCartHandling();

function renderProducts(SortingParameter = 'default', category = 'All', min = 0,  max = 3000) {
    products = JSON.parse(data)
    // container = document.querySelector('#products-container')
    container = document.querySelector('#test')
    SortingParameter = getSortingParameter()
    //Category & Price Range
  filtered = products.filter(product => product.price >= min && product.price <= max && (category === 'All' || product.categories.includes(category)))
    
    if (SortingParameter == 'reviews')
        filtered.sort((a, b) => b.stars - a.stars)
    else if (SortingParameter == 'price'){
        filtered.sort((a, b) => b.price - a.price)
    }



 
    container.innerHTML = ''
    filtered.forEach(elem => {
    const fullStars = Math.floor(elem.stars);
    const hasHalfStar = elem.stars % 1 !== 0; 
    const totalStars = 5; 
    let starsHtml = '';

    // full strs
    for (let i = 0; i < fullStars; i++) {
        starsHtml += '<i class="fa fa-star" aria-hidden="true"></i>';
    }

    // half star if existing
    if (hasHalfStar) {
        starsHtml += '<i class="fa fa-star-half-o" aria-hidden="true"></i>';
    }

    // empty starss
    const emptyStars = totalStars - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        starsHtml += '<i class="fa fa-star-o" aria-hidden="true"></i>';
    }
    const item = cartItems.find(item => item.id == elem.id)
    container.innerHTML += `<div class="wrapper" id="${elem.id}">
        <div class="container" style="padding:0">
    <div class="wishlistButton">
        <input id="toggle-heart-${elem.id}" type="checkbox">
        <label for="toggle-heart-${elem.id}" aria-label="like">❤</label>
        <span>Add to wishlist</span>
    </div>
            <div class="top">
                <img class="productImg" src="${elem.img}" alt="">
            </div>
            <div class="bottom ${item ? 'clicked' : ''}">
                <div class="left">
                    <div class="details">
                        <span class="productTitle" id="${elem.id}">${elem.title}</span>
                        <p>£ ${elem.price}</p>
                        <div class="rating">${starsHtml}</div>
                    </div>
                    <div class="buy">

                        <?xml version="1.0" encoding="UTF-8"?>
                        <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24"
                            width="50" height="50">
                            <path
                                d="M23.94,6.59l-.88,4.39c-.47,2.33-2.53,4.02-4.9,4.02H6.73c.42,1.18,1.53,2,2.83,2h9.44c.55,0,1,.45,1,1s-.45,1-1,1H9.56c-2.53,0-4.67-1.9-4.97-4.42L3.21,2.88c-.06-.5-.49-.88-.99-.88H1c-.55,0-1-.45-1-1S.45,0,1,0h1.22c1.52,0,2.8,1.14,2.98,2.65l.04,.35h3.76c.55,0,1,.45,1,1s-.45,1-1,1h-3.52l.94,8h11.74c1.42,0,2.66-1.01,2.94-2.41l.88-4.39c.06-.29-.02-.6-.21-.83-.19-.23-.47-.37-.77-.37h-4c-.55,0-1-.45-1-1s.45-1,1-1h4c.9,0,1.75,.4,2.32,1.1s.8,1.61,.62,2.49ZM7,20c-1.1,0-2,.9-2,2s.9,2,2,2,2-.9,2-2-.9-2-2-2Zm10,0c-1.1,0-2,.9-2,2s.9,2,2,2,2-.9,2-2-.9-2-2-2ZM9.27,7.25c-.38,.4-.35,1.04,.05,1.41l1.56,1.46c.59,.59,1.36,.88,2.13,.88s1.52-.29,2.09-.86l1.59-1.48c.4-.38,.42-1.01,.05-1.41-.38-.4-1.01-.43-1.41-.05l-1.32,1.23V1c0-.55-.45-1-1-1s-1,.45-1,1v7.43l-1.32-1.23c-.4-.38-1.04-.35-1.41,.05Z" />
                        </svg>

                    </div>
                </div>
                <div class="right">
                    <div class="done">
                        <?xml version="1.0" encoding="UTF-8"?>
                        <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24"
                            width="50" height="50">
                            <path
                                d="m18.214,9.098c.387.394.381,1.027-.014,1.414l-4.426,4.345c-.783.768-1.791,1.151-2.8,1.151-.998,0-1.996-.376-2.776-1.129l-1.899-1.867c-.394-.387-.399-1.02-.012-1.414.386-.395,1.021-.4,1.414-.012l1.893,1.861c.776.75,2.001.746,2.781-.018l4.425-4.344c.393-.388,1.024-.381,1.414.013Zm5.786,2.902c0,6.617-5.383,12-12,12S0,18.617,0,12,5.383,0,12,0s12,5.383,12,12Zm-2,0c0-5.514-4.486-10-10-10S2,6.486,2,12s4.486,10,10,10,10-4.486,10-10Z" />
                        </svg>

                    </div>
                    <div class="details">
                        <span class="productTitle" id="${elem.id}" style="color:black; padding:0">${elem.title}</span>
                        <p>Added to your cart ${item ? `(${item.quantity})` : ''}</p>
                        <span style="color:black">£ ${elem.price}</span>
                    </div>
                    <div class="remove">
                        <?xml version="1.0" encoding="UTF-8"?>
                        <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24"
                            width="50" height="50">
                            <path
                                d="m23,4h-6v-2c0-1.103-.897-2-2-2h-6c-1.103,0-2,.897-2,2v2H1v2h1.644l1.703,15.331c.169,1.521,1.451,2.669,2.982,2.669h9.304c1.531,0,2.813-1.147,2.981-2.669l1.703-15.331h1.682v-2Zm-14-2h6v2h-6v-2Zm8.626,19.11c-.056.507-.483.89-.994.89H7.329c-.51,0-.938-.383-.994-.89l-1.679-15.11h14.65l-1.679,15.11Zm-9.583-4.567l2.543-2.543-2.543-2.543,1.414-1.414,2.543,2.543,2.543-2.543,1.414,1.414-2.543,2.543,2.543,2.543-1.414,1.414-2.543-2.543-2.543,2.543-1.414-1.414Z" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
        <div class="inside" id="layer-${elem.id}">
            <div class="icon" id="layer-${elem.id}">
                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="30"
                    height="30">
                    <path
                        d="m13,7c0,.552-.448,1-1,1s-1-.448-1-1,.448-1,1-1,1,.448,1,1Zm11,12.5v-7.145C24,5.869,19.097.454,12.838.028c-3.469-.236-6.876,1.036-9.329,3.492C1.057,5.977-.211,9.378.029,12.854c.441,6.354,6.074,11.146,13.104,11.146h6.367c2.481,0,4.5-2.019,4.5-4.5ZM12.77,1.026c5.737.39,10.23,5.366,10.23,11.329v7.145c0,1.93-1.57,3.5-3.5,3.5h-6.367c-6.604,0-11.695-4.296-12.105-10.214-.221-3.188.941-6.308,3.189-8.559,2.07-2.073,4.878-3.227,7.8-3.227.25,0,.502.008.753.025Zm.23,17.474v-7c0-.827-.673-1.5-1.5-1.5h-1c-.276,0-.5.224-.5.5s.224.5.5.5h1c.275,0,.5.225.5.5v7c0,.276.224.5.5.5s.5-.224.5-.5Z" />
                </svg>
            </div>
            <div class="contents">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem natus illum atque ab assumenda ipsam
                    eveniet omnis delectus alias quibusdam? Libero dolore nihil quasi reprehenderit. Molestiae
                    recusandae laboriosam repellat dolorem.</p>
            </div>
        </div>
    </div>`
    addToCartHandling()
    document.querySelectorAll('.productTitle').forEach(card => card.addEventListener('click', (e) => {
    let productId = e.target.id;
    localStorage.setItem('productId', productId)
    window.location.href = "product-detail.html"    
    // let product = JSON.parse(data).find(product => product.id == productId);
    // console.log(product);
}));    
    document.querySelectorAll('.inside').forEach(card => card.addEventListener('click', (e) => {
        console.log(e.target)
    let productId = e.target.id;
    localStorage.setItem('productId', productId)
    // window.location.href = "product-detail.html"    
    // let product = JSON.parse(data).find(product => product.id == productId);
    // console.log(product);
}));
});
}


function priceSlider() {
const rangevalue = 
    document.querySelector(".slider-container .price-slider");
const rangeInputvalue = 
    document.querySelectorAll(".range-input input");

let priceGap = 500;

const priceInputvalue = 
    document.querySelectorAll(".price-input input");
for (let i = 0; i < priceInputvalue.length; i++) {
    priceInputvalue[i].addEventListener("input", e => {

        let minp = parseInt(priceInputvalue[0].value);
        let maxp = parseInt(priceInputvalue[1].value);
        let diff = maxp - minp

        if (minp < 0) {
            alert("minimum price cannot be less than 0");
            priceInputvalue[0].value = 0;
            minp = 0;
        }

        if (maxp > 5000) {
            alert("maximum price cannot be greater than 5000");
            priceInputvalue[1].value = 5000;
            maxp = 5000;
        }

        if (minp > maxp - priceGap) {
            priceInputvalue[0].value = maxp - priceGap;
            minp = maxp - priceGap;

            if (minp < 0) {
                priceInputvalue[0].value = 0;
                minp = 0;
            }
        }

        if (diff >= priceGap && maxp <= rangeInputvalue[1].max) {
            if (e.target.className === "min-input") {
                rangeInputvalue[0].value = minp;
                let value1 = rangeInputvalue[0].max;
                rangevalue.style.left = `${(minp / value1) * 100}%`;
            }
            else {
                rangeInputvalue[1].value = maxp;
                let value2 = rangeInputvalue[1].max;
                rangevalue.style.right = 
                    `${100 - (maxp / value2) * 100}%`;
            }
        }
    });

    for (let i = 0; i < rangeInputvalue.length; i++) {
        rangeInputvalue[i].addEventListener("input", e => {
            let minVal = 
                parseInt(rangeInputvalue[0].value);
            let maxVal = 
                parseInt(rangeInputvalue[1].value);

            let diff = maxVal - minVal
            
            if (diff < priceGap) {
            
                if (e.target.className === "min-range") {
                    rangeInputvalue[0].value = maxVal - priceGap;
                }
                else {
                    rangeInputvalue[1].value = minVal + priceGap;
                }
            }
            else {
            
                priceInputvalue[0].value = minVal;
                priceInputvalue[1].value = maxVal;
                rangevalue.style.left =
                    `${(minVal / rangeInputvalue[0].max) * 100}%`;
                rangevalue.style.right =
                    `${100 - (maxVal / rangeInputvalue[1].max) * 100}%`;
            }
        });
    }
}
}

renderProducts()
priceSlider()


// Filter By Category
categories = document.querySelectorAll('.categories li') 
categories.forEach(categoryElem => {
    categoryElem.addEventListener('click', (e) => {
        categories.forEach(item => item.classList.remove('active'))
        e.target.classList.add('active')
        category = getCategory()
        range = getPriceRange()
        parameter = getSortingParameter()
        renderProducts(parameter, category, range.min, range.max)
    });
})

// Sort By Review & Price
document.querySelector('#filter').addEventListener('change', (e) => {
    range = getPriceRange()
    parameter = getSortingParameter()
    category = getCategory()
    renderProducts(parameter, category, range.min, range.max)
})


// Price Range
    document.querySelector('.price-filter').addEventListener('click',  (e) => {
        option = getSortingParameter()
        range = getPriceRange()
        category = getCategory()
        // console.log(`min = ${range.min} || max = ${range.min}`)
        renderProducts(option, category,range.min, range.max)  
    })


document.addEventListener('DOMContentLoaded', () => {
    const wishlistButtons = document.querySelectorAll('.wishlistButton');
    let selectedItems = JSON.parse(localStorage.getItem('wishlistItems')) || [];

    wishlistButtons.forEach(button => {
        const checkbox = button.querySelector('input[type="checkbox"]');
        const label = button.querySelector('label');
        const productId = parseInt(button.closest('.wrapper').id);

        if (selectedItems.includes(productId)) {
            checkbox.checked = true; 
            label.style.color = '#e2264d';
        }

        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                label.style.color = '#e2264d';
                if (!selectedItems.includes(productId)) {
                    selectedItems.push(productId); 
                }
            } else {
                label.style.color = '#888';
                selectedItems = selectedItems.filter(id => id !== productId); 
            }

            localStorage.setItem('wishlistItems', JSON.stringify(selectedItems));
        });
    });
});


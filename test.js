// Select the buy and remove buttons
const buyButton = document.querySelector('.buy');
const removeButton = document.querySelector('.remove');
const bottomElement = document.querySelector('.bottom');

// Add click event listener to the buy button
buyButton.addEventListener('click', function() {
    bottomElement.classList.add('clicked');
});

// Add click event listener to the remove button
removeButton.addEventListener('click', function() {
    bottomElement.classList.remove('clicked');
});
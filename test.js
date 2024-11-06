const buyButton = document.querySelector('.buy');
const removeButton = document.querySelector('.remove');
const bottomElement = document.querySelector('.bottom');

buyButton.addEventListener('click', function() {
    bottomElement.classList.add('clicked');
});

removeButton.addEventListener('click', function() {
    bottomElement.classList.remove('clicked');
});
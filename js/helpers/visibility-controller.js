const showReviewCartButton = () => {
    const cartHandle = document.getElementById('store-footer');
    if (cartHandle.hasAttribute('hidden') && cart.length >= 1) {
        cartHandle.hidden = false;
        cartHandle.offsetHeight;
        cartHandle.classList.remove('hide-footer');
        cartHandle.classList.add('show-footer');
    }
}

const hideReviewCartButton = () => {
    const cartReviewBtn = document.getElementById('store-footer');
    cartReviewBtn.hidden = true;
    cartReviewBtn.offsetHeight;
    cartReviewBtn.classList.add('hide-footer');
}

const hideHomePage = () => {
    const home = document.getElementById('intro-container');
    home.hidden = true;
    home.offsetHeight;
    home.classList.add('hide-home');
}

const showStore = () => {
    const store = document.getElementById('store');
    store.hidden = false;
    store.offsetHeight;
    store.classList.add('view-store');
}
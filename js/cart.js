let cart = [];

const addProductToCart = (prod) => {
    const index = cart.findIndex(p => p.name === prod.name);
    prod.purchaseCount += prod.availableCount > 0 ? 1 : 0;
    index === -1 ? cart.push(prod) : cart[index].purchaseCount = prod.purchaseCount;

    const pIndex = products.findIndex(p => p.name === prod.name);
    products[pIndex].purchaseCount = prod.purchaseCount;
    products[pIndex].availableCount -= prod.availableCount > 0 ? 1 : 0;
    const cartBody = document.getElementById('cart-body');
    const cartModal = document.getElementById("view-cart");

    if (cartBody.children.length > 0 && cartModal.style.display === 'block') {
        const purchaseCount = document.getElementById(`qty-${prod._id}`);
        purchaseCount.value = prod.purchaseCount;
        
        const addButton = document.getElementById('add-' + prod._id)
        addButton.disabled = products[pIndex].availableCount === 0;
        
        updateProductQtyIndicator(prod);
        updateCost(prod);
    }

    updateProductVisibility(prod);

    showReviewCartButton();
}

const removeProductFromCart = (prod) => {
    const index = cart.findIndex(p => p.name === prod.name);
    prod.purchaseCount -= prod.purchaseCount > 0 ? 1 : 0;
    index === -1 ? cart.push(prod) : cart[index].purchaseCount = prod.purchaseCount;

    const pIndex = products.findIndex(p => p.name === prod.name);
    products[pIndex].purchaseCount = prod.purchaseCount;
    products[pIndex].availableCount += 1;

    if (products[pIndex].purchaseCount === 0) {
        resetCart(index, prod);
    } else {
        const cartBody = document.getElementById('cart-body');
        if (cartBody.children.length > 0) {
            const purchaseCount = document.getElementById(`qty-${prod._id}`);
            purchaseCount.value = prod.purchaseCount;

            const addButton = document.getElementById('add-' + prod._id)
            addButton.disabled = prod.availableCount > 0 ? false : true;

            updateProductQtyIndicator(prod);
            updateCost(prod);
        }
    }
}

const deleteFromCart = (prod) => {
    const index = cart.findIndex(p => p.name === prod.name);
    cart.splice(index, 1);

    const pIndex = products.findIndex(p => p.name === prod.name);
    products[pIndex].availableCount = prod.availableCount + prod.purchaseCount;
    products[pIndex].purchaseCount = 0;

    const cartItem = document.getElementById(`cart-item-${prod._id}`);
    cartItem.remove();

    if (cart.length === 0) {
        const cartModal = document.getElementById("view-cart");
        cartModal.style.display = "none";

        updateProductVisibility(prod);
        hideReviewCartButton();
    }
}

const updateProductQtyIndicator = (prod) => {
    const avlQty = prod.availableCount > 0 ? `${prod.availableCount} more left!` : 'None left!';
    const countField = document.getElementById(`available-count-${prod._id}`);
    if (countField) {
        countField.innerText = avlQty;
    }
}


const viewCart = () => {
    const cartModal = document.getElementById("view-cart");
    cartModal.style.display = "block";

    const productQtyInCart = cart.reduce((sum, prod) => sum + prod.purchaseCount, 0);
    const cartHeader = document.getElementById('cart-item-count');
    cartHeader.innerHTML = `Cart (${productQtyInCart})`;

    const cartBody = document.getElementById('cart-body');
    cartBody.innerHTML = '';

    cart.forEach(prod => {
        buildCartItemTemplate(prod);

        const addButton = document.getElementById('add-' + prod._id)
        addButton.onclick = () => addProductToCart(prod);
        addButton.disabled = prod.availableCount > 0 ? false : true;

        const removeButton = document.getElementById('remove-' + prod._id)
        removeButton.onclick = () => removeProductFromCart(prod);

        const trashButton = document.getElementById('trash-' + prod._id)
        trashButton.onclick = () => deleteFromCart(prod);

        updateProductQtyIndicator(prod);
        updateCost(prod);
    });
}

const updateCart = (inputEl, prod) => {
    // total units available for sale
    const maxToBuy = parseInt(prod.availableCount) + parseInt(prod.purchaseCount);

    validateNumber(inputEl, `qty-error-${prod._id}`, maxToBuy, prod.name);

    const inputCount = parseInt(inputEl.value);
    error = document.getElementById(`qty-error-${prod._id}`).innerText;

    const index = cart.findIndex(p => p.name === prod.name);
    const pIndex = products.findIndex(p => p.name === prod.name);

    if (inputCount === 0) {
        prod.availableCount += prod.purchaseCount;
        prod.purchaseCount = 0;
        resetCart(index, prod);
    } else {
        // entered qty is valid and is different from the qty currently in the cart
        if (inputCount !== prod.purchaseCount && error === '') {
            if (inputCount > prod.purchaseCount) {
                prod.availableCount -= (inputCount - prod.purchaseCount);
            } else {
                prod.availableCount += (prod.purchaseCount - inputCount);
            }
            prod.purchaseCount = inputCount;
            cart[index] = prod;
            products[pIndex].purchaseCount = prod.purchaseCount;
            products[pIndex].availableCount = prod.availableCount
        }
    }

    const addButton = document.getElementById('add-' + prod._id)
    if (addButton) {
        addButton.disabled = products[pIndex].availableCount === 0;
    }

    updateProductQtyIndicator(products[pIndex]);
    updateCost(prod);
}

const resetCart = (index, prod) => {
    cart.splice(index, 1);
    const cartItem = document.getElementById(`cart-item-${prod._id}`);
    cartItem.remove();

    if (cart.length === 0) {
        updateProductVisibility(prod);
        const cartModal = document.getElementById("view-cart");
        cartModal.style.display = "none";
    }

    hideReviewCartButton();
}

const updateCost = (prod) => {
    const totalForQty = (prod.purchaseCount * prod.price).toFixed(2);
    const el = document.getElementById(`cart-item-total-${prod._id}`);
    if (el) {
        el.innerText = `$${totalForQty}`;
    }
}

const checkout = () => {
    const cartErrors = [...document.getElementsByClassName('qty-error-field')].filter(e => e.innerText != '');
    if (cartErrors.length > 0) {
        const errorField = document.getElementById('cart-error-field');
        errorField.innerText = 'Please enter valid quantities';
    } else {

        const cartModal = document.getElementById("view-cart");
        cartModal.style.display = "none";

        const formModal = document.getElementById("form");
        formModal.style.display = "block";

        addCustomerDataValidators();
    }
}

const addCustomerDataValidators = () => {
    document.getElementById('name').onkeyup = () => validateName();
    document.getElementById('name').onblur = () => validateName();

    document.getElementById('email').onkeyup = () => validateMail();
    document.getElementById('email').onblur = () => validateMail();

    document.getElementById('credit-card').onkeyup = () => validateCardNumber();
    document.getElementById('credit-card').onblur = () => validateCardNumber();

    document.getElementById('expiry-month').onkeyup = () => validateExpiryMonth();
    document.getElementById('expiry-month').onblur = () => validateExpiryMonth();

    document.getElementById('expiry-year').onkeyup = () => validateExpiryYear();
    document.getElementById('expiry-year').onblur = () => validateExpiryYear();

    document.getElementById('cvv').onkeyup = () => validateCvv();
    document.getElementById('cvv').onblur = () => validateCvv();
}

window.onclick = (event) => {
    const cartModal = document.getElementById('view-cart');
    // Close cart modal if user clicks outside
    if (event.target === cartModal) {
        cartModal.style.display = 'none';
        // Update UI state in the store
        cart.forEach(p => updateProductVisibility(p));
        // Show review cart button if there is atleast one item in the cart
        showReviewCartButton();
    }
}
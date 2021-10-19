const getTagTemplate = (category) => {
    return `<button type="button" class="category" id=${category}>
                <span class="category-label">${category}</span>
            </button>`;
}

const getProductTemplate = (prod) => {
    return `<div>
                <span class="product-name">${prod.name}</span>
                <img src=${prod.img} alt=${prod.name} class="product-image">
            </div>
            <div class="product">
                <span class="product-price">${prod.price}$</span>
                <button type="button" class="cart" id=${prod._id} title="Add to cart">
                    <img src="assets/images/cart.png" alt="cart" class="product-cart-icon">
                </button>
            </div>
            <div class="product-qty-notifier">
                <span id="qty-indicator-${prod._id}"></span>
            </div>`;
}

const getCartItemTemplate = (prod) => {
    const total = (prod.purchaseCount * prod.price).toFixed(2);
    return `<img src="${prod.img}" alt="cart-${prod.name}" class="cart-product-image">
            <div class="cart-product-details">
                <div class="cart-product-name">
                    <span>${prod.name}</span>
                </div>
                <div class="cart-product-qty">
                    <form id="qty-form">
                        <div class="qty-form-item">
                            <span id="qty-error-${prod._id}" class="qty-error-field"></span>
                            <input type="text" name="Qty" id="qty-${prod._id}" value="${prod.purchaseCount}"
                                maxlength="3">
                        </div>
                        <div class="qty-form-item">
                            <span id="available-count-${prod._id}" class="available-count-field"></span>
                        </div>
                    </form>
                    <div class="cart-qty-modifier">
                        <button id="remove-${prod._id}"><span>&minus;</span></button>
                        <button id="add-${prod._id}"><span>&plus;</span></button>
                    </div>
                </div>
                <div class="cart-product-price">
                    <span id="Price${prod._id}">$${prod.price} per Unit</span>
                </div>
                <div class="cart-product-total">
                    <span id="cart-item-total-${prod._id}">$${total}</span>
                </div>
                <div class="cart-product-discard" id="trash-${prod._id}">
                    <span>&#x1F5D1;</span>
                </div>
            </div>`;
}

const getReceiptItemTemplate = (prod) => {
    const total = (prod.purchaseCount * prod.price).toFixed(2);
    return `<div class="product-value">${prod.name}</div>
            <div class="product-value">${prod.purchaseCount}</div>
            <div class="product-value">$${prod.price}</div>
            <div class="product-value">$${total}</div>`;
}
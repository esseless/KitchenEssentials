const buildTagTemplate = (category) => {
    const storeCategories = document.getElementById('categories');
    const tag = document.createElement("div");
    tag.classList.add('category-tag');
    tag.onclick = () => showProductsByCategory(category);
    tag.innerHTML = getTagTemplate(category);
    storeCategories.appendChild(tag);
}

const buildProductTemplate = (prod) => {
    const storeBody = document.getElementById('store-body');
    const product = document.createElement("div");
    product.classList.add('product-detail');
    product.id = `product-${prod._id}`;
    product.innerHTML = getProductTemplate(prod);
    storeBody.appendChild(product);
}

const buildCartItemTemplate = (prod) => {
    const cartBody = document.getElementById('cart-body');
    const product = document.createElement("div");
    product.classList.add('cart-item');
    product.id = `cart-item-${prod._id}`;
    product.innerHTML = getCartItemTemplate(prod);
    cartBody.appendChild(product);

    const inputEl = document.getElementById(`qty-${prod._id}`);
    const maxToBuy = parseInt(prod.availableCount) + parseInt(prod.purchaseCount);
    document.getElementById(`qty-${prod._id}`).onkeyup = () =>
        validateNumber(inputEl, `qty-error-${prod._id}`, maxToBuy, prod.name);
        
    document.getElementById(`qty-${prod._id}`).onblur = () => updateCart(inputEl, prod);
}

const buildReceiptItemTemplate = (prod) => {
    const receipt = document.getElementById('product-details-body');
    const product = document.createElement("div");
    product.classList.add('receipt-item');
    product.innerHTML = getReceiptItemTemplate(prod);
    receipt.appendChild(product);
}
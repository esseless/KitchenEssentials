const defaultCategoryFilter = 'Kitchen';

const showCatalogue = () => {
    hideHomePage();
    showStore();
    loadCategoryTags();
    // Show products for default filter
    showProductsByCategory(defaultCategoryFilter);
}

const loadCategoryTags = () => {
    const categories = [...new Set(products.map(p => p.type))];
    categories.forEach(category => {
        buildTagTemplate(category);
    });
}

const clearFilters = () => {
    [...document.getElementsByClassName('category')].map(x => x.classList.remove('category-selected'));
    document.getElementById('store-body').innerHTML = '';
}

const showProductsByCategory = (category) => {
    clearFilters();
    setSelectedTag(category);
    loadProducts(category);
}

const setSelectedTag = (category) => {
    const tag = document.getElementById(category);
    tag.classList.add('category-selected');
}

const loadProducts = (category) => {
    const storeBody = document.getElementById('store-body');
    storeBody.innerHTML = '';

    const prods = products.filter(p => p.type === category);
    prods.forEach(prod => {
        buildProductTemplate(prod);

        // Update UI state in the store
        const addToCartBtn = document.getElementById(prod._id)
        addToCartBtn.onclick = () => addProductToCart(prod);
        updateProductVisibility(prod);
    });
}

const updateProductVisibility = (prod) => {
    const addToCartBtn = document.getElementById(prod._id);
    const productTile = document.getElementById(`product-${prod._id}`);
    const qtyNotifier = document.getElementById(`qty-indicator-${prod._id}`);
    if (prod.availableCount === 0) {
        productTile.classList.add('product-detail-disabled');
        productTile.title = 'Out of Stock!';
        addToCartBtn.disabled = true;
        qtyNotifier.innerText = 'None left!'
    } else {
        productTile.classList.remove('product-detail-disabled');
        productTile.title = '';
        addToCartBtn.disabled = false;
        qtyNotifier.innerText = `${prod.availableCount} left!`;
    }
}

const shopMore = () => {
    const receiptModal = document.getElementById('receipt');
    receiptModal.style.display = 'none';
    location.reload();
}
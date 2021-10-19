const setCustomerDetails = () => {
    const name = document.getElementById('name').value;
    const mail = document.getElementById('email').value;
    let card = document.getElementById('credit-card').value;
    card = card.replace(CARD_MASK_PATTERN, 'xxxx');

    document.getElementById('customer-name').innerText = name;
    document.getElementById('customer-name').title = name;

    document.getElementById('customer-email').innerText = mail;
    document.getElementById('customer-email').title = name;

    document.getElementById('customer-credit-card').innerText = card;
    document.getElementById('customer-credit-card').title = name;
}

const setProductDetails = () => {
    let donation = 0;
    let total = 0;

    cart.forEach(prod => {
        buildReceiptItemTemplate(prod);
        total += Number((prod.purchaseCount * prod.price).toFixed(2));
    });

    donation = Math.max(.1 * total, 10).toFixed(2);
    const donationEl = document.getElementById('donation');
    donationEl.innerText = `$${donation}`;

    total += parseInt(donation);
    const totalEl = document.getElementById('total');
    totalEl.innerText = `$${total.toFixed(2)}`;
}
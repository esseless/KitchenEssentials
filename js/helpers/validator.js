const PRODUCT_COUNT_PATTERN = /^[0-9]{1,2}$/;

const TEXT_PATTERN = /^([a-zA-Z]+|[a-zA-Z]+\s[a-zA-Z]+|[a-zA-Z]+\s[a-zA-Z]{3,}\s[a-zA-Z]+)$/;
const MAIL_PATTERN = /^.+\@.+\..+$/;
const CREDIT_CARD_PATTERN = /^[1-9]{4}-{0,1}[0-9]{4}-{0,1}[0-9]{4}-{0,1}[0-9]{4}$/;
const EXPIRY_MONTH_PATTERN = /^(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)$/i;
const EXPIRY_YEAR_PATTERN = /^(202)[1-9]{1}$/;
const CARD_CVV_PATTERN = /^\d{3}$/;

const CARD_MASK_PATTERN = /\d{4}(?=-\d{4})/g;

const validateNumber = (el, errorElId, max, name) => {
    const errorField = document.getElementById(errorElId);
    errorField.innerHTML = '';

    if (PRODUCT_COUNT_PATTERN.test(el.value.replace(/\s/g, '')) && parseInt(el.value) <= max) {
        el.style.border = '1px solid lightgrey';
        return true;
    }

    const pIndex = products.findIndex(p => p.name === name);
    updateProductQtyIndicator(products[pIndex]);
    showError(el, errorField, `Please enter a valid number.`);
}

const validateName = () => {
    const el = document.getElementById("name");
    const errorField = document.getElementById("name-error-field");
    return validator(el, errorField, TEXT_PATTERN);
}

const validateMail = () => {
    const el = document.getElementById("email");
    const errorField = document.getElementById("email-error-field");
    return validator(el, errorField, MAIL_PATTERN);
}

const validateCardNumber = () => {
    const el = document.getElementById("credit-card");
    const errorField = document.getElementById("credit-card-error-field");
    el.value = el.value.replace(/-/g, '').match(/.{1,4}/g).join('-');
    return validator(el, errorField, CREDIT_CARD_PATTERN);
}

const validateExpiryMonth = () => {
    const el = document.getElementById("expiry-month");
    const errorField = document.getElementById("month-error-field");
    return validator(el, errorField, EXPIRY_MONTH_PATTERN);
}

const validateExpiryYear = () => {
    const el = document.getElementById("expiry-year");
    const errorField = document.getElementById("year-error-field");
    return validator(el, errorField, EXPIRY_YEAR_PATTERN);
}

const validateCvv = () => {
    const el = document.getElementById("cvv");
    const errorField = document.getElementById("cvv-error-field");
    return validator(el, errorField, CARD_CVV_PATTERN);
}

const validator = (el, errorField, pattern) => {
    errorField.innerHTML = '';
    if (pattern.test(el.value.replace(/\s/g, ''))) {
        el.style.border = '1px solid lightgrey';
        return true;
    }

    showError(el, errorField, `Please enter a valid ${el.name}.`);
}

const showError = (el, errorField, error) => {
    el.style.border = '1px solid red';
    errorField.innerHTML = error;
}
const confirmOrder = () => {
    const emptyFormInputs = [...document.getElementsByClassName('form-input')].filter(e => e.value === '');
    const formErrors = [...document.getElementsByClassName('error-field')].filter(e => e.innerText != '');
    if (emptyFormInputs.length > 0 || formErrors.length > 0) {
        const errorField = document.getElementById('form-error-field');
        errorField.innerText = emptyFormInputs.length > 0 ? 'All fields are mandatory!' : formErrors.length > 0 ?
            'Please enter valid data!' : 'Something went wrong!';
    } else {
        const formModal = document.getElementById("form");
        formModal.style.display = 'none';

        const receiptModal = document.getElementById("receipt");
        receiptModal.style.display = "block";

        setCustomerDetails();
        setProductDetails();
    }
}
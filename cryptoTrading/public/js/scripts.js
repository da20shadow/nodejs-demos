function displayErrorMessage(errorMessage) {
    const errorMessageElement = document.createElement('div');
    errorMessageElement.textContent = errorMessage;
    errorMessageElement.style.backgroundColor = '#da5555';
    errorMessageElement.style.color = '#ffffff';
    errorMessageElement.style.padding = '1em';
    errorMessageElement.style.position = 'fixed';
    errorMessageElement.style.top = '1em';
    errorMessageElement.style.right = '1em';
    errorMessageElement.style.animation = 'slide-in 0.5s ease-out forwards';

    document.body.appendChild(errorMessageElement);

    setTimeout(() => {
        errorMessageElement.style.display = 'none';
    }, 3000);
}
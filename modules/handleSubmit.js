export function handleSubmit(form) {
    const loader = document.querySelector('.form .loader');
    const formValues = new FormData(form);
    const formDiv = document.querySelector('.form');
    const formFields = [
        document.getElementById('name'),
        document.getElementById('email'),
        document.getElementById('phone'),
        document.getElementById('questions')
    ];
    const thankYou = document.createElement('h1');
    thankYou.innerText = "Thank you!";
    const inTouchSoon = document.createElement('p');
    inTouchSoon.innerText = "I'll be in touch with you soon to discuss this project.";
    const errorMessage = document.createElement('h3');
    errorMessage.innerText = "Something went wrong; make sure all the required fields are filled out and correct, and try again.";
    errorMessage.setAttribute('id', 'error-message');

    loader.setAttribute('class', 'loader-active');

    fetch('/handleSubmit.php', {
        method: 'POST',
        body: formValues
    })
    .then((response) => {
        loader.setAttribute('class', 'loader');
        if (response.ok) {
            console.log('yeah');
            formDiv.removeChild(form);
            if (document.getElementById('error-message')) {
                formDiv.removeChild(document.getElementById('error-message'));
            }
            formDiv.appendChild(thankYou);
            formDiv.appendChild(inTouchSoon);
        }
        else {
            console.log('ruh roh raggy');
            if (!document.getElementById('error-message')) {
                formDiv.appendChild(errorMessage);
            }
            formFields.forEach(field => {
                field.style.borderColor = 'initial';
                if (!field.checkValidity()) {
                    field.style.borderStyle = 'solid';
                    field.style.borderColor = 'red';
                }                
            });
        }
    })
}
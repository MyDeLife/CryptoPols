var contactLink_mobile = document.getElementById('contact-button-mobile');

contactLink_mobile.addEventListener('click', function (event) {
    event.preventDefault();
    document.getElementById('contact-mobile').classList.add('visible', 'contact-form-scaled');
});

$(document).ready(function () {
    $('#contactForm-mobile').on('submit', function (event) {
        event.preventDefault();

        var formData = new FormData(this);
        var request = new XMLHttpRequest();

        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                var responseMessage = $('#responseMessage-mobile');
                if (request.status === 200) {
                    responseMessage.text('Email to CryptoPols sent successfully!');
                    disableFormFields('#contactForm-mobile', '#send-message-btn-mobile');
                } else {
                    responseMessage.text('An error occurred while sending the email. Please try again later.');
                }
                responseMessage.show();
                $('#send-message-btn-mobile').hide();
            }
        };

        request.open('POST', 'https://cryptopols.com/db/send_email.php');
        request.send(formData);
    });

    $('#close-button-mobile').on('click', function () {
        $('#contact-mobile').removeClass('visible', 'contact-form-scaled');
        enableFormFields('#contactForm-mobile', '#responseMessage-mobile', '#send-message-btn-mobile');
    });
});

function disableFormFields(formSelector, buttonSelector) {
    var formElements = $(formSelector)[0].elements;
    for (var i = 0; i < formElements.length; i++) {
        if (formElements[i].id !== buttonSelector.replace('#', '')) {
            formElements[i].disabled = true;
        }
    }
}

function enableFormFields(formSelector, messageSelector, buttonSelector) {
    var formElements = $(formSelector)[0].elements;
    for (var i = 0; i < formElements.length; i++) {
        formElements[i].disabled = false;
    }

    // Reset the form
    $(formSelector)[0].reset();

    // Hide the response message and reset its text
    var responseMessage = $(messageSelector);
    responseMessage.hide();
    responseMessage.text('');

    // Show the send button
    $(buttonSelector).show();
}


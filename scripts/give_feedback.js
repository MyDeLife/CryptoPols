var contactLink = document.getElementById('contact-button');

contactLink.addEventListener('click', function (event) {
    event.preventDefault();
    document.getElementById('contact').classList.add('visible', 'contact-form-scaled');
});

$(document).ready(function () {
    $('#contactForm').on('submit', function (event) {
        event.preventDefault();

        var formData = new FormData(this);
        var request = new XMLHttpRequest();

        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                var responseMessage = $('#responseMessage');
                if (request.status === 200) {
                    responseMessage.text('Email to CryptoPols sent successfully!');
                    disableFormFields('#contactForm', '#send-message-btn');
                } else {
                    responseMessage.text('An error occurred while sending the email. Please try again later.');
                }
                responseMessage.show();
                $('#send-message-btn').hide();
            }
        };

        request.open('POST', 'https://cryptopols.com/db/send_email.php');
        request.send(formData);
    });

    $('#close-button').on('click', function () {
        $('#contact').removeClass('visible', 'contact-form-scaled');
        enableFormFields('#contactForm', '#responseMessage', '#send-message-btn');
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

// update congress average sentiment
$.ajax({
    url: "http://localhost/dashboard/devcodes/cryptopols/db/fetch_country.php",
    dataType: "json",
    success: function (data) {
        const divElement = document.getElementById('congress-avg');
        const currentSentiment = data.find(row => row.cohort === 'total').current_sentiment;
        const style = getComputedStyle(document.documentElement);

        divElement.textContent = currentSentiment;

        switch (currentSentiment) {
            case 'Strongly Pro':
                divElement.style.backgroundColor = style.getPropertyValue('--strongly-pro').trim();
                break;
            case 'Slightly Pro':
                divElement.style.backgroundColor = style.getPropertyValue('--slightly-pro').trim();
                break;
            case 'Neutral':
                divElement.style.backgroundColor = style.getPropertyValue('--neutral').trim();
                break;
            case 'Slightly Anti':
                divElement.style.backgroundColor = style.getPropertyValue('--slightly-anti').trim();
                break;
            case 'Strongly Anti':
                divElement.style.backgroundColor = style.getPropertyValue('--strongly-anti').trim();
                break;
            default:
                console.error('Unexpected Sentiment Value:', currentSentiment);
        }
    },
    error: function (jqXHR, textStatus, errorThrown) {
        console.error("Error:", textStatus, errorThrown);
    }
});


// update party ratings
$.ajax({
    url: "http://localhost/dashboard/devcodes/cryptopols/db/fetch_country.php",
    dataType: "json",
    success: function (data) {
        const demsArrow = document.querySelector('.arrow.dems');
        const repsArrow = document.querySelector('.arrow.reps');

        const demsRating = data.find(row => row.cohort === 'dems').current_rating;
        const repsRating = data.find(row => row.cohort === 'reps').current_rating;

        demsArrow.style.setProperty('--dems-pos', demsRating);
        repsArrow.style.setProperty('--reps-pos', repsRating);
    },
    error: function (jqXHR, textStatus, errorThrown) {
        console.error("Error:", textStatus, errorThrown);
    }
});




// pop-up for quote to show entire text

document.querySelectorAll(".movers-quote").forEach((quote) => {
    quote.addEventListener("click", () => {
        alert(quote.textContent);
    });
});


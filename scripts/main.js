// update congress average sentiment
$.ajax({
    url: "https://cryptopols.com/db/fetch_country.php", //https://cryptopols.com/db/fetch_country.php // http://localhost/dashboard/devcodes/cryptopols/db/fetch_country.php
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
            case 'Not enough data':
                divElement.style.backgroundColor = style.getPropertyValue('--not-enough-data').trim();
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
    url: "https://cryptopols.com/db/fetch_country.php", //https://cryptopols.com/db/fetch_country.php // http://localhost/dashboard/devcodes/cryptopols/db/fetch_country.php
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
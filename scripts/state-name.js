// fetch state data
function fetchStateName(stateAbbr) {
    console.log("Requesting state name...");

    $.ajax({
        url: "https://cryptopols.com/db/fetch_states.php", // https://cryptopols.com/db/fetch_states.php // http://localhost/dashboard/devcodes/CryptoPols/db/fetch_states.php
        dataType: "json",
        success: function (states) {
            console.log("States Data:", states);

            const stateData = states.find(state => state.name === stateAbbr);
            if (stateData) {
                const fullStateName = stateData.full_name;
                setStateName(fullStateName);

                // set the state sentiment text content
                const stateSentimentElement = document.getElementById("state-sentiment");
                stateSentimentElement.textContent = stateData.sentiment;

                // set the background color based on the state sentiment value
                const style = getComputedStyle(document.documentElement);
                switch (stateData.sentiment) {
                    case 'Strongly Pro':
                        stateSentimentElement.style.backgroundColor = style.getPropertyValue('--strongly-pro').trim();
                        break;
                    case 'Slightly Pro':
                        stateSentimentElement.style.backgroundColor = style.getPropertyValue('--slightly-pro').trim();
                        break;
                    case 'Neutral':
                        stateSentimentElement.style.backgroundColor = style.getPropertyValue('--neutral').trim();
                        break;
                    case 'Slightly Anti':
                        stateSentimentElement.style.backgroundColor = style.getPropertyValue('--slightly-anti').trim();
                        break;
                    case 'Strongly Anti':
                        stateSentimentElement.style.backgroundColor = style.getPropertyValue('--strongly-anti').trim();
                        break;
                    case 'Not enough data':
                        stateSentimentElement.style.backgroundColor = style.getPropertyValue('--not-enough-data').trim();
                        break;
                    default:
                        console.error('Unexpected Sentiment Value:', stateData.sentiment);
                }
            } else {
                setStateName(null);
            }
        },

        error: function (jqXHR, textStatus, errorThrown) {
            console.log("Error:", textStatus, errorThrown);
            console.log("Response:", jqXHR.responseText);
            setStateName(null);
        }
    });
}

// set state full_name
function setStateName(fullStateName) {
    const stateId = getQueryParam("state");
    const stateAbbr = stateId.substring(3);
    const stateNameElement = document.getElementById("state-name");

    if (fullStateName !== null && fullStateName !== "") {
        stateNameElement.textContent = fullStateName;
    } else if (stateAbbr !== null && stateAbbr !== "") {
        stateNameElement.textContent = "State: " + stateAbbr;
    } else {
        stateNameElement.textContent = "State: Unknown";
    }
}

function getQueryParam(param) {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get(param);
}

$(function () {
    const stateAbbr = getQueryParam("state").substring(3);
    fetchStateName(stateAbbr);
});
function fetchStateName(stateAbbr) {
    console.log("Requesting state name...");

    $.ajax({
        url: "http://localhost/dashboard/devcodes/CryptoPols/db/fetch_states.php",
        dataType: "json",
        success: function (states) {
            console.log("States Data:", states);

            const stateData = states.find(state => state.name === stateAbbr);
            if (stateData) {
                const fullStateName = stateData.full_name;
                setStateName(fullStateName);
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

function setStateName(fullStateName) {
    const stateId = getQueryParam("state");
    const stateAbbr = stateId.substring(3);
    const stateNameElement = document.getElementById("state-name");

    if (fullStateName !== null && fullStateName !== "") {
        stateNameElement.textContent = fullStateName;
    } else if (stateAbbr !== null && stateAbbr !== "") {
        stateNameElement.textContent = stateAbbr;
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

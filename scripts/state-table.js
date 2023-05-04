
$(function () {
    console.log("Requesting politicians data...");
    const state = getUrlParameter("state").substring(3);

    $.ajax({
        url: "http://localhost/dashboard/devcodes/CryptoPols/db/fetch_politicians.php", //http://cryptopols.com/db/fetch_politicians.php //http://localhost/dashboard/devcodes/CryptoPols/db/fetch_politicians.php
        dataType: "json",
        data: { state: state },
        success: function (politicians) {
            console.log("Politicians Data:", politicians);
            const baseURL = 'https://www.govtrack.us/static/legislator-photos/';

            politicians.forEach(politician => {
                const row = $('<tr>');

                const imageURL = `${baseURL}${politician.gov_track}-200px.jpeg`;
                console.log('Image URL:', imageURL);
                row.append(`<td class="party" data-party="${politician.party}"><div class="party-icon party-${politician.party.replace(/\s+/g, '')}" title="${politician.party}"></div></td>`);
                row.append(`<td class="table-img-name"><span class="name-link" onclick="openPoliticianPage('${politician.name}')"><img class="table-profile-img" src="${imageURL}" alt="no photo"/> ${politician.name}</span></td>`);

                row.append(`<td class="office"><span>${politician.office}</span></td>`);

                // Check if the district value is 0, if so, display an empty cell
                const districtDisplayValue = politician.district === "0" ? "" : politician.district;
                row.append(`<td class="district"><span>${districtDisplayValue}</span></td>`);

                row.append(`<td class="cfr" data-cfr="${politician.cfr}"><div class="cfr-inner">${politician.cfr}</div></td>`);
                $('#politician-table tbody').append(row);
            });

            console.log("tablesorter plugin:", $.tablesorter);
            initTablesorter();
        },

        error: function (jqXHR, textStatus, errorThrown) { 
            console.log("Error:", textStatus, errorThrown);
            console.log("Response:", jqXHR.responseText); 
        }
    });
});


function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}


function initTablesorter() {
    $.tablesorter.addParser({
        id: "partySort",
        is: function (s) {
            return false;
        },
        format: function (s, table, cell) {
            const partyOrder = ["Dem", "Rep", "Ind", "Grn"];
            return partyOrder.indexOf($(cell).attr("data-party"));
        },
        type: "numeric"
    });

    $.tablesorter.addParser({
        id: "cfrSort",
        is: function (s) {
            return false;
        },
        format: function (s, table, cell) {
            const cfrOrder = ["Strongly Anti-Crypto", "Slightly Anti-Crypto", "Neutral", "Slightly Pro-Crypto", "Strongly Pro-Crypto"];
            return cfrOrder.indexOf($(cell).attr("data-cfr"));
        },
        type: "numeric"
    });

    $("#politician-table").tablesorter({
        headerTemplate: "{content}<span class='header-arrow header-arrow-up'>&#x25B2;</span><span class='header-arrow header-arrow-down'>&#x25BC;</span>",
        headers: {
            0: {
                sorter: "partySort"
            },
            4: {
                sorter: "cfrSort"
            }
        },
                sortList: [
            [2, 1], // First, sort by the Office column (index 2)
            [3, 0], // Then, sort by the District column (index 3)
        ],
    });

    window.openPoliticianPage = function (name) {
        window.location.href = `politician.html?name=${encodeURIComponent(name)}`;
    };
}


// fetch state politicians data
function fetchPoliticiansData(state) {
    console.log("Requesting politicians data...");

    $.ajax({
        url: "http://localhost/dashboard/devcodes/CryptoPols/db/fetch_politicians.php", //http://cryptopols.com/db/fetch_politicians.php //http://localhost/dashboard/devcodes/CryptoPols/db/fetch_politicians.php
        dataType: "json",
        data: { state: state },
        success: function (politicians) {
            // Clear existing data
            $('#politician-table tbody').empty();

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

            $("#politician-table").trigger("update");

            // Wait for the table to be processed, then sort:
            setTimeout(function () {
                $("#politician-table").trigger("sorton", [[[2, 1], [3, 0]]]);
            }, 0);

            console.log("tablesorter plugin:", $.tablesorter);
            initTablesorter();
        },

        error: function (jqXHR, textStatus, errorThrown) {
            console.log("Error:", textStatus, errorThrown);
            console.log("Response:", jqXHR.responseText);
        }
    });
}

$(function () {
    const state = getUrlParameter("state").substring(3);
    fetchPoliticiansData(state);
});

// set table sorting with default settings
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
        id: "nameSort",
        is: function (s) {
            return false;
        },
        format: function (s, table, cell) {
            return $(cell).text().toLowerCase();
        },
        type: "text"
    });

    $.tablesorter.addParser({
        id: "cfrSort",
        is: function (s) {
            return false;
        },

        format: function (s, table, cell) {
            const cfrOrder = ["Strongly Anti", "Slightly Anti", "Neutral", "Slightly Pro", "Strongly Pro", "Not enough data"];
            const cfrIndex = cfrOrder.indexOf(s);

            if (cfrIndex === cfrOrder.length - 1) {
                return "";
            }            
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
            1: { // "name" column
                sorter: "nameSort"
            },
            4: {
                sorter: "cfrSort"
            }
        },
        sortList: [
            [2, 1], // First, sort by the Office column (index 2)
            [3, 0], // Then, sort by the District column (index 3),
        ]
    });

    // IMPORTANT: re-introduce when releasing Politicians page:
    /*
   window.openPoliticianPage = function (name) {
       window.location.href = `politician.html?name=${encodeURIComponent(name)}`;
   };
   */
}





$(document).ready(function () {
    const states = [
        { name: 'Alabama', id: 'AL' },
        { name: 'Alaska', id: 'AK' },
        { name: 'Arizona', id: 'AZ' },
        { name: 'Arkansas', id: 'AR' },
        { name: 'California', id: 'CA' },
        { name: 'Colorado', id: 'CO' },
        { name: 'Connecticut', id: 'CT' },
        { name: 'Delaware', id: 'DE' },
        { name: 'Florida', id: 'FL' },
        { name: 'Georgia', id: 'GA' },
        { name: 'Hawaii', id: 'HI' },
        { name: 'Idaho', id: 'ID' },
        { name: 'Illinois', id: 'IL' },
        { name: 'Indiana', id: 'IN' },
        { name: 'Iowa', id: 'IA' },
        { name: 'Kansas', id: 'KS' },
        { name: 'Kentucky', id: 'KY' },
        { name: 'Louisiana', id: 'LA' },
        { name: 'Maine', id: 'ME' },
        { name: 'Maryland', id: 'MD' },
        { name: 'Massachusetts', id: 'MA' },
        { name: 'Michigan', id: 'MI' },
        { name: 'Minnesota', id: 'MN' },
        { name: 'Mississippi', id: 'MS' },
        { name: 'Missouri', id: 'MO' },
        { name: 'Montana', id: 'MT' },
        { name: 'Nebraska', id: 'NE' },
        { name: 'Nevada', id: 'NV' },
        { name: 'New Hampshire', id: 'NH' },
        { name: 'New Jersey', id: 'NJ' },
        { name: 'New Mexico', id: 'NM' },
        { name: 'New York', id: 'NY' },
        { name: 'North Carolina', id: 'NC' },
        { name: 'North Dakota', id: 'ND' },
        { name: 'Ohio', id: 'OH' },
        { name: 'Oklahoma', id: 'OK' },
        { name: 'Oregon', id: 'OR' },
        { name: 'Pennsylvania', id: 'PA' },
        { name: 'Rhode Island', id: 'RI' },
        { name: 'South Carolina', id: 'SC' },
        { name: 'South Dakota', id: 'SD' },
        { name: 'Tennessee', id: 'TN' },
        { name: 'Texas', id: 'TX' },
        { name: 'Utah', id: 'UT' },
        { name: 'Vermont', id: 'VT' },
        { name: 'Virginia', id: 'VA' },
        { name: 'Washington', id: 'WA' },
        { name: 'West Virginia', id: 'WV' },
        { name: 'Wisconsin', id: 'WI' },
        { name: 'Wyoming', id: 'WY' }
    ];

    const $stateSelect = $('#state-select');

    states.forEach(state => {
        $stateSelect.append(new Option(state.name, state.id));
    });

    $stateSelect.select2({      
        allowClear: true
    });

    $stateSelect.on('select2:select', function (e) {
        var stateId = $(this).val();
        var stateName = $(this).find('option:selected').text();
        if (stateId) {
            fetchPoliticiansData(stateId);
            $('#state-name').text(stateName);

            // Fetch the state name (and sentiment)
            fetchStateName(stateId);
        }
    });



    $('select').select2({
        width: '18rem',
    });

    const urlStateId = getQueryParam("state");
    if (urlStateId) {
        const stateAbbr = urlStateId.substring(3);
        fetchPoliticiansData(stateAbbr);
        fetchStateName(stateAbbr);
    } else {
        // If no state parameter in the URL, get the selected state from the dropdown
        const selectedStateId = $('#state-select').val();
        if (selectedStateId) {
            fetchPoliticiansData(selectedStateId);
            fetchStateName(selectedStateId);
        }
    }

});
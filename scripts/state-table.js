// fetch state politicians data
function fetchPoliticiansData(state) {
    console.log("Requesting politicians data...");

    $.ajax({
        url: "https://cryptopols.com/db/fetch_politicians.php",
        dataType: "json",
        data: { state: state },
        success: function (politicians) {
            $('#politician-table tbody').empty();

            console.log("Politicians Data:", politicians);
            const baseURL = 'https://www.govtrack.us/static/legislator-photos/';

            // Sort politicians first by office (descending) then by district (ascending)
            politicians.sort((a, b) => {
                if (a.office === b.office) {
                    if (isNaN(a.district) || isNaN(b.district)) {
                        if (isNaN(a.district) && isNaN(b.district)) {
                            return a.district.localeCompare(b.district);
                        }
                        return isNaN(a.district) ? 1 : -1;
                    }
                    return parseInt(a.district, 10) - parseInt(b.district, 10);
                }
                return b.office.localeCompare(a.office);
            });

            politicians.forEach(politician => {
                const row = $('<tr>');

                const imageURL = `${baseURL}${politician.gov_track}-200px.jpeg`;
                console.log('Image URL:', imageURL);
                row.append(`<td class="party" data-party="${politician.party}"><div class="party-icon party-${politician.party.replace(/\s+/g, '')}" title="${politician.party}"></div></td>`);
                row.append(`<td class="table-img-name"><span class="name-link" onclick="openPoliticianPage('${politician.name}')"><img class="table-profile-img" src="${imageURL}" alt="no photo"/> ${politician.name}</span></td>`);

                row.append(`<td class="office hide-on-mobile"><span>${politician.office}</span></td>`);

                const districtDisplayValue = politician.district === "0" ? "" : politician.district;
                row.append(`<td class="district hide-on-mobile"><span>${districtDisplayValue}</span></td>`);

                row.append(`<td class="cfr" data-cfr="${politician.cfr}"><div class="cfr-inner">${politician.cfr}</div></td>`);
                $('#politician-table tbody').append(row);
            });

            updateURL(state);
        },

        error: function (jqXHR, textStatus, errorThrown) {
            console.log("Error:", textStatus, errorThrown);
            console.log("Response:", jqXHR.responseText);
        }
    });
}

function updateURL(state) {
    const url = new URL(window.location);
    url.searchParams.set("state", "US-" + state);
    window.history.replaceState({}, '', url);
}

$(function () {
    const state = getUrlParameter("state").substring(3);
    fetchPoliticiansData(state);
});

function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}


// state select dropdown

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
        }
    });

    $('select').select2({
        width: '18rem',
    });

    const urlStateId = getUrlParameter("state");
    if (urlStateId) {
        const stateAbbr = urlStateId.substring(3);
        $stateSelect.val(stateAbbr).trigger('change');
    }

    function filterStateTable() {
        const searchTerm = $("#state-table-filter-field").val().toLowerCase();
        $("#politician-table tbody tr").each(function () {
            const politicianName = $(this).find(".name-link").text().toLowerCase();
            const district = $(this).find(".district").text().toLowerCase();

            if (
                politicianName.includes(searchTerm) ||
                district.includes(searchTerm)
            ) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    }

    $("#state-table-filter-field").on("keyup", filterStateTable);
});





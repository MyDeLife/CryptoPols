$(function () {
    console.log("Requesting politicians data...");
    const state = getUrlParameter("state");
    $.ajax({
        url: "http://localhost/dashboard/devcodes/CryptoPols/db/fetch_politicians.php",
        dataType: "json",
        data: { state: state },
        success: function (politicians) {
            console.log("Politicians Data:", politicians);
            politicians.forEach(politician => {
                const row = $('<tr>');
                row.append(`<td class="party" data-party="${politician.party}"><div class="party-icon party-${politician.party.replace(/\s+/g, '')}" title="${politician.party}"></div></td>`);
                row.append(`<td><span class="name-link" onclick="openPoliticianPage('${politician.name}')">${politician.name}</span></td>`);
                row.append(`<td class="office"><span>${politician.office}</span></td>`);
                row.append(`<td class="district"><span>${politician.district}</span></td>`);
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
        }
    });

    window.openPoliticianPage = function (name) {
        window.location.href = `politician.html?name=${encodeURIComponent(name)}`;
    };
}
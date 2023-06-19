// fetch legislations data
function fetchLegislationsData() {
    console.log("Requesting legislations data...");

    $.ajax({
        url: "https://cryptopols.com/db/fetch_legislations.php", //change to your local server url if needed
        dataType: "json",
        success: function (legislations) {
            // Clear existing data
            $('#legislation-table tbody').empty();

            console.log("Legislations Data:", legislations);

            const rowsData = [];

            legislations.forEach(legislation => {
                const row = $('<tr class="leg-row">'); // Add a class to the row for attaching a click event

                row.append(`<td class="leg-details-arrow"><div class="fas fa-caret-right"></div></td>`);
                row.append(`<td class="leg-number">${legislation.leg_number}</td>`);
                row.append(`<td class="leg-title">${legislation.title}</td>`);
                row.append(`<td class="leg-branch hide-on-mobile">${legislation.office}</td>`);
                row.append(`<td class="leg-sponsor-party-color" data-sponsor-party="${legislation.sponsor_party}"><div class="leg-sponsor-party-color-inner">${legislation.sponsor_party}</div></td>`);
                row.append(`<td class="leg-sponsor">${legislation.sponsor_name}</td>`);
                row.append(`<td class="leg-cosponsors">${legislation.cosponsors_total}</td>`);
                row.append(`<td class="leg-introduced hide-on-mobile">${legislation.introduced}</td>`);
                row.append(`<td class="leg-sentiment" data-leg-sentiment="${legislation.leg_sentiment}"><div class="leg-sentiment-inner">${legislation.leg_sentiment}</div></td>`);

                // Add an expansion section for the row. This section is hidden by default
                const sealImage = legislation.office === 'Senate' ? 'https://cryptopols.com/assets/seal_senate.png' : 'https://cryptopols.com/assets/seal_house.svg.png';
                const expansion = $(`
                    <tr class="expansion">
                        <td colspan="9">
                            <div class="leg-details-cont">
                                <div class="leg-details details1">
                                    <div class="leg-summary-cont">
                                        <span class="leg-summary-label">Summary</span>
                                        <span class="leg-summary-text">${legislation.summary}
                                            <a class="leg-full-text" href="${legislation.link_full_text}" target="_blank">[Read full text]</a>
                                        </span>
                                    </div>
                                    <div class="leg-latest-action-cont">
                                        <span class="leg-latest-action-label">Latest Action</span>
                                        <span class="leg-latest-action-text">${legislation.latest_action}</span>
                                    </div>
                                    <div class="leg-status-cont">
                                        <span class="leg-status-label">Status</span>
                                        <span class="leg-status-text">
                                            <div class="leg-status-text-value" id="status-introduced">Introduced</div>
                                            <div class="leg-status-text-value" id="status-passed-house">Passed House</div>
                                            <div class="leg-status-text-value" id="status-passed-senate">Passed Senate</div>
                                            <div class="leg-status-text-value" id="status-to-president">To President</div>
                                            <div class="leg-status-text-value" id="status-became-law">Became Law</div>
                                        </span>
                                    </div>
                                </div>
                                <div class="leg-details details2"> 
                                    <hr class="vertical-div"></hr>
                                </div>
                                <div class="leg-details details3">
                                    <div class="leg-branch-seal-cont">
                                        <img class="leg-branch-seal-img" src="${sealImage}">
                                    </div>
                                    <div class="leg-cosponsors-cont">
                                        <span class="leg-cosponsors-label">Cosponsors</span>
                                        <span class="leg-cosponsors-text">
                                            <div class="leg-cosponsors-value" id="leg-cosponsors-dems">Democrats
                                                <span class="leg-cosponsors-value-number">${legislation.cosponsors_dems}</span>
                                            </div>
                                            <div class="leg-cosponsors-value" id="leg-cosponsors-reps">Republicans
                                                <span class="leg-cosponsors-value-number">${legislation.cosponsors_reps}</span>
                                            </div>
                                            <div class="leg-cosponsors-value" id="leg-cosponsors-inds">Independents
                                                <span class="leg-cosponsors-value-number">${legislation.cosponsors_ind}</span>
                                            </div>
                                        </span>
                                    </div>
                                    <div class=leg-impact-cont>
                                        <span class="leg-status-label">Impact</span>
                                        <span class="leg-impact-text">
                                            <div class="leg-impact-text-value" id="impact-minor">Minor</div>
                                            <div class="leg-impact-text-value" id="impact-low">Low</div>
                                            <div class="leg-impact-text-value" id="impact-moderate">Moderate</div>
                                            <div class="leg-impact-text-value" id="impact-high">High</div>
                                            <div class="leg-impact-text-value" id="impact-major">Major</div>
                                        </span>
                                    </div>                                    
                                </div>
                            </div>    
                        </td>
                    </tr>

                `);
                expansion.hide();


                // LEG STATUS
                const statusIdMap = {
                    "Introduced": "status-introduced",
                    "Passed House": "status-passed-house",
                    "Passed Senate": "status-passed-senate",
                    "To President": "status-to-president",
                    "Became Law": "status-became-law"
                };

                const billStatusFromDatabase = legislation.status;
                const billStatusIdFromDatabase = statusIdMap[billStatusFromDatabase];

                $(expansion).find('.leg-status-text-value').each(function (i, statusItem) {
                    if (statusItem.id === billStatusIdFromDatabase || $(statusItem).hasClass('active')) {
                        $(statusItem).addClass('active');
                    }
                });

                // LEG IMPACT
                const impactIdMap = {
                    "Minor": "impact-minor",
                    "Low": "impact-low",
                    "Moderate": "impact-moderate",
                    "High": "impact-high",
                    "Major": "impact-major"
                };

                const billImpactFromDatabase = legislation.leg_impact_value;
                const billImpactIdFromDatabase = impactIdMap[billImpactFromDatabase];

                $(expansion).find('.leg-impact-text-value').each(function (i, impactItem) {
                    if (impactItem.id === billImpactIdFromDatabase || $(impactItem).hasClass('active')) {
                        $(impactItem).addClass('active');
                    }
                });

                $('#legislation-table tbody').append(row);
                $('#legislation-table tbody').append(expansion);
               
                rowsData.push({
                    row: row,
                    expansion: expansion
                });
            });

            rowsData.sort((a, b) => {
                const dateA = new Date(a.row.find('.leg-introduced').text());
                const dateB = new Date(b.row.find('.leg-introduced').text());
                return dateB - dateA; // for descending order
            });

            // Append the sorted rows data to the table
            rowsData.forEach(data => {
                $('#legislation-table tbody').append(data.row);
                $('#legislation-table tbody').append(data.expansion);
            });

            // Attach a click event to the rows
            $('.leg-row').on('click', function () {
                // Find the corresponding expansion section and toggle it
                const expansion = $(this).next('.expansion');
                expansion.slideToggle(200);

                // Check if this row was previously clicked (we use a 'data' attribute for this)
                const wasClicked = $(this).data('clicked') === true;

                // Remove 'clicked' from all rows
                $('#legislation-table tr').removeClass('clicked').data('clicked', false);
                $('#legislation-table tr').find('.fa-caret-right').removeClass('rotate-caret'); // reset all carets

                // If this row was not previously clicked, add 'clicked' to it and mark it as clicked
                if (!wasClicked) {
                    $(this).addClass('clicked').data('clicked', true);
                    $(this).find('.fa-caret-right').addClass('rotate-caret'); // only rotate the caret of the clicked row
                }

                // Hide all other expansion sections
                $('.expansion').not(expansion).slideUp(200);
            });

            $("#legislation-table").trigger("update");

        },

        error: function (jqXHR, textStatus, errorThrown) {
            console.log("Error:", textStatus, errorThrown);
            console.log("Response:", jqXHR.responseText);
        }
    });

}

// Call the function to fetch the legislations data when the page loads
fetchLegislationsData();


// filter for bills
function filterBills() {
    const searchTerm = $("#leg-bill-search").val().toLowerCase();

    // Here, we should iterate over all table rows with the class ".leg-row"
    $(".leg-row").each(function () {
        const bill = $(this).find(".leg-number").text().toLowerCase();

        if (bill.includes(searchTerm)) {
            $(this).show();

        } else {
            $(this).hide();

        }
    });
}

fetchLegislationsData();

$("#leg-bill-search").on("keyup", filterBills);


// filter for title
function filterTitle() {
    const searchTerm = $("#leg-title-search").val().toLowerCase();

    $(".leg-row").each(function () {
        const title = $(this).find(".leg-title").text().toLowerCase();

        if (title.includes(searchTerm)) {
            $(this).show();

        } else {
            $(this).hide();

        }
    });
}

fetchLegislationsData();

$("#leg-title-search").on("keyup", filterTitle);


// filter for branch
function filterBranch() {
    const searchTerm = $("#leg-branch-search").val().toLowerCase();

    $(".leg-row").each(function () {
        const branch = $(this).find(".leg-branch").text().toLowerCase();

        if (branch.includes(searchTerm)) {
            $(this).show();

        } else {
            $(this).hide();

        }
    });
}

fetchLegislationsData();

$("#leg-branch-search").on("keyup", filterBranch);


// filter for sponsor
function filterSponsor() {
    const searchTerm = $("#leg-sponsor-search").val().toLowerCase();

    $(".leg-row").each(function () {
        const sponsor = $(this).find(".leg-sponsor").text().toLowerCase();

        if (sponsor.includes(searchTerm)) {
            $(this).show();

        } else {
            $(this).hide();

        }
    });
}

fetchLegislationsData();

$("#leg-sponsor-search").on("keyup", filterSponsor);


// filter for cosponsors
function filterCosponsors() {
    const searchTerm = $("#leg-cosponsors-search").val().toLowerCase();

    $(".leg-row").each(function () {
        const cosponsors = $(this).find(".leg-cosponsors").text().toLowerCase();

        if (cosponsors.includes(searchTerm)) {
            $(this).show();

        } else {
            $(this).hide();

        }
    });
}

fetchLegislationsData();

$("#leg-cosponsors-search").on("keyup", filterCosponsors);


// filter for introduced
function filterIntroduced() {
    const searchTerm = $("#leg-introduced-search").val().toLowerCase();

    $(".leg-row").each(function () {
        const introduced = $(this).find(".leg-introduced").text().toLowerCase();

        if (introduced.includes(searchTerm)) {
            $(this).show();

        } else {
            $(this).hide();

        }
    });
}

fetchLegislationsData();

$("#leg-introduced-search").on("keyup", filterIntroduced);


// filter for introduced
function filterSentiment() {
    const searchTerm = $("#leg-sentiment-search").val().toLowerCase();

    $(".leg-row").each(function () {
        const sentiment = $(this).find(".leg-sentiment").text().toLowerCase();

        if (sentiment.includes(searchTerm)) {
            $(this).show();

        } else {
            $(this).hide();

        }
    });
}

fetchLegislationsData();

$("#leg-sentiment-search").on("keyup", filterSentiment);

/*

// set table sorting with default settings
function initTablesorter() {


    $.tablesorter.addParser({
        id: "sponsor_nameSort",
        is: function (s) {
            return false;
        },
        format: function (s, table, cell) {
            return $(cell).text().toLowerCase();
        },
        type: "text"
    });

    $.tablesorter.addParser({
        id: "leg_sentimentSort",
        is: function (s) {
            return false;
        },
        format: function (s, table, cell) {
            const leg_sentimentOrder = ["Strongly Anti", "Slightly Anti", "Neutral", "Slightly Pro", "Strongly Pro"];
            return leg_sentimentOrder.indexOf($(cell).find(".leg-sentiment-inner").text());
        },
        type: "numeric"
    });


    $("#legislation-table").tablesorter({
        headerTemplate: "{content}<span class='header-arrow header-arrow-up'>&#x25B2;</span><span class='header-arrow header-arrow-down'>&#x25BC;</span>",
        headers: {
            4: { // "name" column
                sorter: "sponsor_nameSort"
            },
            7: {
                sorter: "leg_sentimentSort"
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
   
}*/
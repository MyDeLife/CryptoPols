// fetch congress letters data
function fetchCongressLettersData() {
    console.log("Requesting congress letters...");

    $.ajax({
        url: "https://cryptopols.com/db/fetch_congress_letters.php",
        dataType: "json",
        success: function (congressLetters) {
            // Clear existing data
            $('#cl-table tbody').empty();

            console.log("Congress Letters Data:", congressLetters);

            const rowsData = [];

            congressLetters.forEach(congressLetter => {
                const row = $('<tr class="cl-row">'); // Add a class to the row for attaching a click event

                row.append(`<td class="cl-details-arrow"><div class="fas fa-caret-right"></div></td>`);
                row.append(`<td class="cl-date">${congressLetter.date}</td>`);
                row.append(`<td class="cl-topic" title="${congressLetter.topic}">${congressLetter.topic}</td>`);
                row.append(`<td class="cl-branch">${congressLetter.branch}</td>`);
                row.append(`<td class="cl-signer-party-color" data-signer-party="${congressLetter.prim_signer_party}"><div class="cl-signer-party-color-inner">${congressLetter.prim_signer_party}</div></td>`);
                row.append(`<td class="cl-signer">${congressLetter.prim_signer_name}</td>`);
                row.append(`<td class="cl-sentiment" data-cl-sentiment="${congressLetter.cl_sentiment}"><div class="cl-sentiment-inner">${congressLetter.cl_sentiment}</div></td>`);

                // Add an expansion section for the row. This section is hidden by default
                const sealImage = congressLetter.branch === 'Senate' ? 'https://cryptopols.com/assets/seal_senate.png' : 'https://cryptopols.com/assets/seal_house.svg.png';
                const expansion = $(`
                    <tr class="expansion">
                        <td colspan="7">
                            <div class="cl-details-cont">
                                <div class="cl-details details1">
                                    <div class="cl-branch-seal-cont">
                                        <img class="cl-branch-seal-img" src="${sealImage}">
                                    </div>
                                    <div class="cl-addressee-cont">
                                        <span class="cl-addressee-label">Addressee</span>
                                        <span class="cl-addressee-text">${congressLetter.addressee}</span>
                                    </div>
                                </div>
                                <div class="cl-details details2"> 
                                    <div class="cl-summary-cont">
                                        <span class="cl-summary-label">Key Statement</span>
                                        <span class="cl-summary-text">${congressLetter.key_statement}
                                            <a class="cl-full-text" href="${congressLetter.cl_link}" target="_blank">[Read full text]</a>
                                        </span>
                                    </div>
                                </div>
                                <div class="cl-details details3">
                                    <div class="cl-cosigners-cont">
                                        <span class="cl-cosigners-label">Cosigners</span>
                                        <span class="cl-cosigners-text">
                                            <div class="cl-cosigners-value" id="cl-cosigners-dems">Democrats
                                                <span class="cl-cosigners-value-number">${congressLetter.cosigners_dems}</span>
                                            </div>
                                            <div class="cl-cosigners-value" id="cl-cosigners-reps">Republicans
                                                <span class="cl-cosigners-value-number">${congressLetter.cosigners_reps}</span>
                                            </div>
                                            <div class="cl-cosigners-value" id="cl-cosigners-inds">Independents
                                                <span class="cl-cosigners-value-number">${congressLetter.cosigners_ind}</span>
                                            </div>
                                        </span>
                                    </div>                                
                                </div>
                            </div>    
                        </td>
                    </tr>

                `);
                expansion.hide();


                $('#cl-table tbody').append(row);
                $('#cl-table tbody').append(expansion);

                rowsData.push({
                    row: row,
                    expansion: expansion
                });
            });

            rowsData.sort((a, b) => {
                const dateA = new Date(a.row.find('.cl-date').text());
                const dateB = new Date(b.row.find('.cl-date').text());
                return dateB - dateA; // for descending order
            });

            // Append the sorted rows data to the table
            rowsData.forEach(data => {
                $('#cl-table tbody').append(data.row);
                $('#cl-table tbody').append(data.expansion);
            });

            // Attach a click event to the rows
            $('.cl-row').on('click', function () {
                // Find the corresponding expansion section and toggle it
                const expansion = $(this).next('.expansion');
                expansion.slideToggle(200);

                // Check if this row was previously clicked (we use a 'data' attribute for this)
                const wasClicked = $(this).data('clicked') === true;

                // Remove 'clicked' from all rows
                $('#cl-table tr').removeClass('clicked').data('clicked', false);
                $('#cl-table tr').find('.fa-caret-right').removeClass('rotate-caret');

                // If this row was not previously clicked, add 'clicked' to it and mark it as clicked
                if (!wasClicked) {
                    $(this).addClass('clicked').data('clicked', true);
                    $(this).find('.fa-caret-right').addClass('rotate-caret'); // only rotate the caret of the clicked row

                    setTimeout(() => {
                        // Calculate the scrolling position
                        const containerTop = $('#cl-table-cont').offset().top;
                        const rowTop = $(this).offset().top;
                        const rowHeight = $(this).outerHeight();
                        const scrollPosition = $('#cl-table-cont').scrollTop() + rowTop - containerTop - rowHeight + 8;

                        // Scroll to the calculated position within the specific container
                        $('#cl-table-cont').animate({
                            scrollTop: scrollPosition
                        }, 'normal');
                    }, 250); // slightly longer than the slideToggle duration
                }

                // Hide all other expansion sections
                $('.expansion').not(expansion).slideUp(200);
            });

            $("#cl-table").trigger("update");

        },

        error: function (jqXHR, textStatus, errorThrown) {
            console.log("Error:", textStatus, errorThrown);
            console.log("Response:", jqXHR.responseText);
        }
    });

}

// Call the function to fetch the legislations data when the page loads
fetchCongressLettersData();

// filter for bills, title, branch and sponsor
function filterCongressLettersTable() {
    const searchTerm = $("#cl-search-field").val().toLowerCase();
    $(".cl-row").each(function () {
        const topic = $(this).find(".cl-topic").text().toLowerCase();
        const signer = $(this).find(".cl-signer").text().toLowerCase();

        if (
            topic.includes(searchTerm) ||
            signer.includes(searchTerm)
        ) {
            $(this).show();
        } else {
            $(this).hide();
        }
    });
}

fetchCongressLettersData();

$("#cl-search-field").on("keyup", filterCongressLettersTable);


// jQuery example
$(window).resize(function () {
    if ($(window).width() <= 768) {
        $('#cl-search-field').attr('placeholder', 'Enter signer or keyword');
    } else {
        $('#cl-search-field').attr('placeholder', 'Enter signer or keyword');
    }
});

// run on page load
$(window).trigger('resize');

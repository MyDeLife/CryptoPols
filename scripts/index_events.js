$(document).ready(function () {

    /*display events in streamer*/
    function renderEvent(eventData) {
        const formattedDate = formatDate(eventData.date);
        const eventHtml = `
      <div class="rec-events-cont3 pub">
          <div class="rec-events-div1 pub">
          </div>
          <div class="rec-events-div2 pub">
              <div class="rec-events-div2-1 pub">
                  <div class="rec-events-div2-1-1 pub">
                      <div class="rec-event-pol-party rec-events-text pub">
                          <p class="rec-event-pol-party-color pub"></p>
                      </div>
                      <div class="rec-event-pol-image-div pub">
                          <img class="rec-event-pol-image pub" src="">
                      </div>
                  </div>
                  <div class="rec-events-div2-1-2 pub">
                      <div class="rec-event-pol-name rec-events-text pub">${eventData.politician}</div>
                      <div class="rec-event-pol-office rec-events-text pub">House of Rep</div>
                  </div>
              </div>
              <div class="rec-events-div2-2 pub">
                  <div class="rec-event-date rec-events-text pub">${formattedDate}</div>
                  <div class="rec-event-act rec-events-text pub">${eventData.engagement_act}</div>
              </div>
          </div>
          <div class="rec-events-div3 pub">
              <div class="rec-event-quote rec-events-text pub">${eventData.quote}</div>
          </div>
          <div class="rec-events-div4 pub">
              <div class="rec-events-div4-1 pub">
                  <div class="rec-event-sentiment-label rec-events-text pub">Sentiment</div>
                  <div class="rec-event-sentiment rec-events-text pub">${eventData.sentiment}</div>
              </div>
              <div class="rec-events-div4-2 pub">
                  <div class="rec-event-src-logo rec-events-text pub"><a><ion-icon name="logo-twitter" class="twitter"></ion-icon></a></div>
                  <div class="rec-event-link rec-events-text pub">Link</div>
              </div>
          </div>
      </div>
      <div class="divider"></div>
    `;
        return eventHtml;
    }

    /* fetch data from database*/
    function fetchEvents() {
        $.ajax({
            url: "http://localhost/dashboard/devcodes/cryptopols/db/fetch_events.php",
            method: "GET",
            dataType: "json",
            success: function (data) {
                let eventsHtml = "";
                data.forEach(function (eventData) {
                    eventsHtml += renderEvent(eventData);
                });
                $("#rec-events-data-pub").html(eventsHtml);
            },
            error: function (error) {
                console.error("Error fetching events:", error);
            },
        });
    }

    /* filter for streamer */
    function filterEvents() {
        const searchTerm = $("#search-input").val().toLowerCase();
        $(".rec-events-cont3.pub").each(function () {
            const politicianName = $(this).find(".rec-event-pol-name.rec-events-text.pub").text().toLowerCase();
            const state = $(this).find(".rec-event-pol-office.rec-events-text.pub").text().toLowerCase();
            const party = $(this).find(".rec-event-pol-party-color.pub").text().toLowerCase();

            if (
                politicianName.includes(searchTerm) ||
                state.includes(searchTerm) ||
                party.includes(searchTerm)
            ) {
                $(this).show();
                $(this).next(".divider").show();
            } else {
                $(this).hide();
                $(this).next(".divider").hide();
            }
        });
    }

    fetchEvents();

    $("#search-input").on("keyup", filterEvents);

    /* update date format from database to mmmm dd, yyyy */
    function formatDate(dateString) {
        const months = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];
        const date = new Date(dateString);
        const month = months[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();

        return `${month} ${day}, ${year}`;
    }

});




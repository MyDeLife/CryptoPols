$(document).ready(function () {

    /*display events in public statement streamer*/
    function renderEvent(eventData) {
        const formattedDate = formatDate(eventData.date);
        const baseURL = 'https://www.govtrack.us/static/legislator-photos/';
        const imageURL = `${baseURL}${eventData.gov_track}-200px.jpeg`;

        const eventHtml = `
      <div class="rec-events-cont3 pub">
          <div class="rec-events-div1 pub">
          </div>
          <div class="rec-events-div2 pub">
              <div class="rec-events-div2-1 pub">
                  <div class="rec-events-div2-1-1 pub">
                      <div class="rec-event-pol-party rec-events-text pub">
                          <p class="rec-event-pol-party-color pub" data-party="${eventData.party}"></p>
                      </div>
                      <div class="rec-event-pol-image-div pub">
                          <img class="rec-event-pol-image pub" src="${imageURL}">
                      </div>
                  </div>
                  <div class="rec-events-div2-1-2 pub">
                      <div class="rec-event-pol-name rec-events-text pub">${eventData.politician}</div>
                      <div class="rec-event-pol-office rec-events-text pub">${formatOffice(eventData.office)} | <a href="./html/state.html?state=US-${eventData.state_abbr}">${eventData.state_abbr}</a></div>
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
                  <div class="rec-event-sentiment rec-events-text pub" data-sentiment="${eventData.event_sentiment}">${eventData.event_sentiment}</div>
              </div>
              <div class="rec-events-div4-2 pub">
                  <!-- <div class="rec-event-src-logo rec-events-text pub"><a><ion-icon name="logo-twitter" class="twitter"></ion-icon></a></div> -->
                  <div class="rec-event-link rec-events-text pub"><a href=${eventData.link} target=_blank>${eventData.source}</a></div>
              </div>
          </div>
      </div>
      <div class="divider"></div>
    `;
        return eventHtml;
    }

    /*display events in legislative action streamer*/
    function renderLegislativeAction(eventData) {
        const formattedDate = formatDate(eventData.date);
        const sealImage = eventData.office === 'sen' ? './assets/seal_senate.png' : './assets/seal_house.svg.png';
        const baseURL = 'https://www.govtrack.us/static/legislator-photos/';
        const imageURL = `${baseURL}${eventData.gov_track}-200px.jpeg`;

        const eventHtml = `
                    <div class="rec-events-cont3 leg">
                        <div class="rec-events-div1 leg">
                        </div>
                        <div class="rec-events-div2 leg">
                            <div class="rec-events-div2-3 leg">
                                <img class="rec-event-seal leg" src="${sealImage}">
                            </div>
                            <div class="rec-events-div2-1 leg">
                                <div class="rec-events-div2-1-2 leg">
                                    <div class="rec-event-pol-name rec-events-text leg">${eventData.politician}</div>
                                    <div class="rec-event-pol-office rec-events-text leg">${formatOffice(eventData.office)} | <a href="./html/state.html?state=US-${eventData.state_abbr}">${eventData.state_abbr}</a></div>
                                </div>
                                <div class="rec-events-div2-1-1 leg">
                                    <div class="rec-event-pol-image-div leg">
                                        <img class="rec-event-pol-image leg" src="${imageURL}">
                                    </div>
                                    <div class="rec-event-pol-party rec-events-text leg">
                                        <p class="rec-event-pol-party-color leg" data-party="${eventData.party}"></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="rec-events-div3 leg">
                            <div class="rec-events-div3-1 leg">
                                <div class="rec-event-act rec-events-text leg">${eventData.engagement_act}</div>
                                <div class="rec-event-link rec-events-text leg"><a href=${eventData.link} target=_blank>${eventData.source}</a></div>
                            </div>
                            <div class="rec-event-quote rec-events-text leg">${eventData.quote}</div>
                        </div>
                        <div class="rec-events-div4 leg">
                            <div class="rec-events-div4-2 leg">
                                <div class="rec-events-div2-2 leg">
                                    <div class="rec-event-date rec-events-text leg">${formattedDate}</div>

                                </div>
                            </div>
                            <div class="rec-events-div4-1 leg">
                                <div class="rec-event-sentiment-label rec-events-text leg">Sentiment</div>
                                <div class="rec-event-sentiment rec-events-text leg" data-sentiment="${eventData.event_sentiment}">${eventData.event_sentiment}</div>
                            </div>

                        </div>
                    </div>
                    <div class="divider">
                    </div>
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
                let eventsHtmlPub = "";
                let eventsHtmlLeg = "";
                const daysAgo185 = new Date();
                daysAgo185.setDate(daysAgo185.getDate() - 185);

                data.forEach(function (eventData) {
                    const eventDate = new Date(eventData.date);
                    if (eventDate >= daysAgo185) {
                        if (eventData.engagement_cat === 'Public Statement') {
                            eventsHtmlPub += renderEvent(eventData);
                        } else if (eventData.engagement_cat === 'Legislative Action') {
                            eventsHtmlLeg += renderLegislativeAction(eventData);
                        }
                    }
                });
                $("#rec-events-data-pub").html(eventsHtmlPub);
                $("#rec-events-data-leg").html(eventsHtmlLeg);
            },
            error: function (error) {
                console.error("Error fetching events:", error);
            },
        });
    }



    /* filter for public statement streamer */
    function filterEventsPub() {
        const searchTerm = $("#search-input-pub").val().toLowerCase();
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

    $("#search-input-pub").on("keyup", filterEventsPub);


    /* filter for legislative action streamer */
    function filterEventsLeg() {
        const searchTerm = $("#search-input-leg").val().toLowerCase();
        $(".rec-events-cont3.leg").each(function () {
            const politicianName = $(this).find(".rec-event-pol-name.rec-events-text.leg").text().toLowerCase();
            const state = $(this).find(".rec-event-pol-office.rec-events-text.leg").text().toLowerCase();
            const party = $(this).find(".rec-event-pol-party-color.leg").text().toLowerCase();

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

    $("#search-input-leg").on("keyup", filterEventsLeg);

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
    /* update office format from db*/
    function formatOffice(office) {
        if (office === 'sen') {
            return 'Senate';
        } else if (office === 'rep') {
            return 'House of Rep';
        } else {
            return office; // Fallback in case an unknown value is encountered
        }
    }
});






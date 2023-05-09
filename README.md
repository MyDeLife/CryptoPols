<img src="./assets/CP Logo 128px.png">

# CryptoPols

<h4><i>Track crypto sentiment of US politicians in Congress</i></h4>
<br>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#1-features">Features</a></li>
    <li><a href="#2-key-files">Key Files</a></li>
    <li><a href="#3-getting-started">Getting Started</a></li>
    <li><a href="#4-contributing">Contributing</a></li>
    <li><a href="#5-supporting-cryptopols">Supporting Cryptopols</a></li>
    <li><a href="#6-license">License</a></li>
    <li><a href="#7-links">Links</a></li>
  </ol>
</details>
<br>

CryptoPols is a website that tracks the sentiment of US politicians in Congress towards crypto, blockchain technology, and web3. The goal is to provide clear insights on this topic and help people make better-informed decisions when voting. The site also aims to facilitate taking action based on the provided information.
<br>

## 1. Features

- Displays the average sentiment of Congress
- Provides average party ratings across all members of Congress
- Displays sentiment of each US state on an interactive map
- Lists politicians along with their sentiment, party, and district information
<br>

## 2. Key Files

### `index.js`

- Fetches and displays the average sentiment data in Congress and assigns a background color based on the sentiment value.
- Fetches and updates the position of party ratings based on sentiment.

### `state-map.js`

- Initializes an interactive map of the US states using the [amCharts](https://www.amcharts.com/docs/v5/getting-started/) library.
- Fetches sentiment data for each state and assigns a color based on the sentiment value.
- Displays a tooltip with the state name and sentiment when hovering over a state.
- Redirects to the state.html page when clicking on a state.

### `index_events.js`
- Fetches and displays politician data for crypto sentiment events from the last 6 months
- Categorizes events by `public statements` and `legislative actions`
- Updates politician data formatting for date and office
### `state-name.js`

- Fetches the full name of a state based on its abbreviation.
- Sets the state name and sentiment text content in the state.html page.
- Assigns a background color based on the state sentiment value.
<br>

### `state-table.js`

- Fetches and displays a table of politicians with their sentiment, party, and district information for the user selected state.
- Initializes [tablesorter](https://mottie.github.io/tablesorter/docs/) to allow sorting of politicians by party or sentiment.
<br>

## 3. Getting Started

To set up the project on your local machine, follow these steps:

1. Clone the repository.
2. Open the `index.html` file in your web browser.
3. Navigate through the website to explore its features.

Please note that you will need to set up a local web server or adjust URLs for AJAX requests to load your data from the back-end.
<br>

## 4. Contributing

To contribute to the project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes to the branch.
4. Submit a pull request with a description of your changes.
<br>

## 5 Supporting CryptoPols
To support the ongoing development and expansion of cryptopols.com, you can can contribute to CryptoPols funding campaign on [Indiegogo](https://www.indiegogo.com/projects/cryptopols/x/33602943#/).
<br>
## 6. License

This project is licensed under the MIT License. Please see the [LICENSE](LICENSE) file for more information.
<br>
## 7. Links
- [Website](https://cryptopols.com/)
- [Twitter](https://twitter.com/_cryptopols)
- [Indiegogo](https://www.indiegogo.com/projects/cryptopols/x/33602943#/) (funding campaign)
- [Email](mydelife.cryptopols@gmail.com)
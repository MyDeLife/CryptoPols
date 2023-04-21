$(function () {
    const politicians = [
        { name: 'Politician 1', party: 'Democrat', office: 'Senator', district: '', cfr: 'Neutral' },
        { name: 'Politician 2', party: 'Democrat', office: 'Senator', district: '', cfr: 'Slightly Pro-Crypto' },
        { name: 'Bryan Steil', party: 'Republican', office: 'Rep.', district: '1', cfr: 'Strongly Pro-Crypto' },
        { name: 'Politician 4', party: 'Independent', office: 'Rep.', district: '2', cfr: 'Slightly Anti-Crypto' },
        { name: 'Politician 5', party: 'Republican', office: 'Rep.', district: '3', cfr: 'Strongly Anti-Crypto' },
        { name: 'Politician 6', party: 'Democrat', office: 'Rep.', district: '4', cfr: 'Strongly Pro-Crypto' },
        { name: 'Politician 7', party: 'Republican', office: 'Rep.', district: '5', cfr: 'Slightly Pro-Crypto' },
        { name: 'Politician 8', party: 'Republican', office: 'Rep.', district: '6', cfr: 'Neutral' },
        { name: 'Politician 9', party: 'Republican', office: 'Rep.', district: '7', cfr: 'Slightly Anti-Crypto' },
        { name: 'Politician 10', party: 'Democrat', office: 'Rep.', district: '8', cfr: 'Strongly Anti-Crypto' },
    ];

    const partyColors = {
        'Republican': 'red',
        'Democrat': 'blue',
        'Green': 'green',
        'Independent': 'yellow',
    };

    const cfrColors = {
        'Strongly Pro-Crypto': 'var(--strongly-pro',
        'Slightly Pro-Crypto': 'var(--slightly-pro',
        'Neutral': 'var(--neutral',
        'Slightly Anti-Crypto': 'var(--slightly-anti)',
        'Strongly Anti-Crypto': 'var(--strongly-anti)',
    };
    politicians.forEach(politician => {
        const row = $('<tr>');
        row.append(`<td><span class="name-link" onclick="openPoliticianPage('${politician.name}')">${politician.name}</span></td>`);
        row.append(`<td><div class="party-icon" style="background-color: ${partyColors[politician.party]}" title="${politician.party}"></div></td>`);
        row.append(`<td class="office"><span>${politician.office}</span></td>`);
        row.append(`<td class="district"><span>${politician.district}</span></td>`);
        row.append(`<td class="cfr" style="background-color: ${cfrColors[politician.cfr]}">${politician.cfr}</td>`);
        $('#politician-table tbody').append(row);
    });

    $("#politician-table").tablesorter();

    window.openPoliticianPage = function (name) {
        window.location.href = `politician_1.html?name=${encodeURIComponent(name)}`;
    };
});
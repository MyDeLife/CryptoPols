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
        placeholder: "Select a state...",
        allowClear: true
    });

    $stateSelect.on('select2:select', function (e) {
        var stateId = $(this).val();
        if (stateId) {
            window.location.href = './html/state.html?state=US-' + stateId;
        }
    });

    
    var selectWidth = window.matchMedia("(max-width: 768px)").matches ? '22rem' : '25rem';

    $('select').select2({
        width: selectWidth
    });


    const urlStateId = getURLParamater("state");
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



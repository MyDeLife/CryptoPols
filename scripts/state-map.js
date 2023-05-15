// amchart of US map
am5.ready(function () {

    var root = am5.Root.new("chartdiv");

    root.setThemes([
        am5themes_Animated.new(root)
    ]);

    var chart = root.container.children.push(am5map.MapChart.new(root, {
        panX: "rotateX",
        panY: "none",
        projection: am5map.geoAlbersUsa(),
        layout: root.horizontalLayout,
        wheelY: "none",
        wheelX: "none",
    }));

    var polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_usaLow,
        valueField: "value",
        calculateAggregates: true
    }));

    function getColorBySentiment(sentiment) {
        switch (sentiment) {
            case "Strongly Pro":
                return am5.color("#F2a900");
            case "Slightly Pro":
                return am5.color("#be7b15");
            case "Neutral":
                return am5.color("#9D5444");
            case "Slightly Anti":
                return am5.color("#8a3d8d");
            case "Strongly Anti":
                return am5.color("#480088");
            case "Not enough data":
                return am5.color("#C0C0C0");
            default:
                return am5.color("#C0C0C0");
        }
    }

    polygonSeries.mapPolygons.template.setAll({
        tooltipHTML: "<div style='text-align: center; color: #FFFFFF; font-weight: bold; font-family: Tahoma';>{name}<br><b style='font-weight: bold; font-family: Tahoma'>{sentiment}</b></div>",
    });

    polygonSeries.mapPolygons.template.adapters.add("fill", function (fill, target) {
        return getColorBySentiment(target.dataItem.dataContext.sentiment);
    });

    if (!window.matchMedia("(max-width: 768px)").matches) {
        // screen width is larger than 768px
        polygonSeries.mapPolygons.template.events.on("pointerup", function (ev) {
            var stateId = ev.target.dataItem.dataContext.id;
            window.location.href = './html/state.html?state=' + stateId;
        });
    }


    $.ajax({
        url: "https://cryptopols.com/db/fetch_states.php", //https://cryptopols.com/db/fetch_states.php //http://localhost/dashboard/devcodes/cryptopols/db/fetch_states.php
        dataType: "json",
        success: function (statesData) {
            console.log("States Data:", statesData);
            polygonSeries.data.setAll(statesData);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("Error:", textStatus, errorThrown);
        }
    });

});
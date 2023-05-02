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

    polygonSeries.mapPolygons.template.setAll({
        tooltipHTML: "<div style='text-align: center; color: #FFFFFF;'>{name}<br><b>{sentiment}</b></div>",

    });


    /* polygonSeries.mapPolygons.template.events.on("pointerover", function (ev) {
heatLegend.showValue(ev.target.dataItem.get("value"));
    }); */

    polygonSeries.mapPolygons.template.events.on("pointerup", function (ev) {
        var stateId = ev.target.dataItem.dataContext.id;
        window.location.href = './html/state.html?state=' + stateId;
    });

    const stronglyAntiColor = am5.color(getComputedStyle(document.documentElement).getPropertyValue("--strongly-anti"));
    const stronglyProColor = am5.color(getComputedStyle(document.documentElement).getPropertyValue("--strongly-pro"));

    polygonSeries.set("heatRules", [{
        target: polygonSeries.mapPolygons.template,
        dataField: "value",
        min: stronglyAntiColor,
        max: stronglyProColor,
        key: "fill"
    }]);

    polygonSeries.events.on("datavalidated", function () {
        polygonSeries.mapPolygons.each(function (mapPolygon) {
            mapPolygon.set("fill", mapPolygon.dataItem.dataContext.color);
        });
    });

    function getColorBySentiment(sentiment) {
        switch (sentiment) {
            case "Not enough data":
                return am5.color(getComputedStyle(document.documentElement).getPropertyValue("--neutral"));
            case "Strongly Pro":
                return am5.color(getComputedStyle(document.documentElement).getPropertyValue("--strongly-pro"));
            case "Slightly Pro":
                return am5.color(getComputedStyle(document.documentElement).getPropertyValue("--slightly-pro"));
            case "Neutral":
                return am5.color(getComputedStyle(document.documentElement).getPropertyValue("--neutral"));
            case "Slightly Anti":
                return am5.color(getComputedStyle(document.documentElement).getPropertyValue("--slightly-anti"));
            case "Strongly Anti":
                return am5.color(getComputedStyle(document.documentElement).getPropertyValue("--strongly-anti"));
        }
    }



    $.ajax({
        url: "http://localhost/dashboard/devcodes/CryptoPols/db/fetch_states.php",
        dataType: "json",
        success: function (statesData) {
            console.log("States Data:", statesData);
            statesData.forEach(state => {
                state.color = getColorBySentiment(state.sentiment);
            });

            polygonSeries.data.setAll(statesData);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("Error:", textStatus, errorThrown);
        }
    });



    var heatLegend = am5.HeatLegend.new(root, {
        orientation: "horizontal",
        startColor: am5.color(0x55009f),
        endColor: am5.color(0xF2a900),
        startText: "",
        endText: "",
        stepCount: 10000
    });


    heatLegend.startLabel.setAll({
        fontSize: 15,
        fill: heatLegend.get("startColor")
    });

    heatLegend.endLabel.setAll({
        fontSize: 15,
        fill: heatLegend.get("endColor")
    });

    polygonSeries.events.on("datavalidated", function () {
        heatLegend.set("startValue", polygonSeries.getPrivate("valueLow"));
        heatLegend.set("endValue", polygonSeries.getPrivate("valueHigh"));
    });

});





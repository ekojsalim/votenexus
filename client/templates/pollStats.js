Template.pollStats.helpers({
	title: function() {
		return Polls.findOne().title;
	}
});

Template.pollStats.onRendered(function() {

	var x = Polls.findOne().options.map(function(item) {
			return {
				name: item.optionName,
				y: item.votes
			};
		});

    $("#container-pie").highcharts({
        chart: {
            type: "pie"
        },
        title: {
            text: ""
        },
        tooltip: {
            pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>"
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: "pointer",
                dataLabels: {
                    enabled: true,
                    format: "<b>{point.name}</b>: {point.percentage:.1f} %",
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || "black"
                    }
                }
            }
        },
        series: [{
            name: "Votes",
            data: x
        }]
    });

        $("#container-donut").highcharts({
        chart: {
            type: "pie",
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
            }
        },
        title: {
            text: ""
        },
        credits: {
			enabled: false
        },
        plotOptions: {
            pie: {
                innerSize: 100,
                depth: 45
            }
        },
        series: [{
            name: "Votes",
            data: x
        }]
    });
});

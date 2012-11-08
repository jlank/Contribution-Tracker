function createChart(div_id, line1_data, line2_data, maxamount) {
    var chart;
    $(document).ready(function() {
			chart = new Highcharts.Chart({
            chart: {
                renderTo: div_id,
                //zoomType: 'x',
                spacingRight: 20,
                width: 500,
                type: 'spline'
            },
            title: {
                text: div_id
            },
            subtitle: {
                //text: document.ontouchstart === undefined ?
                    'Click and drag in the plot area to zoom in' :
                    'Drag your finger over the plot to zoom in'
            },
            xAxis: {
                type: 'datetime',
                //maxZoom: 14 * 24 * 3600000, // fourteen days
                title: {
                    text: 'Date'
                }
            },
            yAxis: [{
                title: {
                    text: 'Contribution (Blue) / Mention Frequency Index'
                },
                min: 0,
                max: maxamount+(maxamount/5),
            },
            { // Secondary yAxis
                title: {
                    text: 'Mentions',
                    style: {
                        color: '#AA4643'
                    }
                },
                // labels: {
                //     formatter: function() {
                //         return this.value +' mm';
                //     },
                //     style: {
                //         color: '#4572A7'
                //     }
                // }
                opposite: true,
                min: 0,
    
            }],
            tooltip: {
                shared: true
            },
            legend: {
                enabled: false
            },
      
            plotOptions: {
                spline: {
                    lineWidth: 4,
                    states: {
                        hover: {
                            lineWidth: 5
                        }
                    },
                    marker: {
                        enabled: false,
                        states: {
                            hover: {
                                enabled: true,
                                symbol: 'circle',
                                radius: 5,
                                lineWidth: 1
                            }
                        }
                    },
                    //pointInterval: 3600000, // one hour
                    //pointStart: Date.UTC(2009, 9, 6, 0, 0, 0)
                }
            },

            series: [{
                //type: 'area',
                name: 'Contribution Amount',
                //pointInterval: 24 * 3600 * 1000, // by day
                //pointInterval: 24 * 3600 * 1000 * 30, // by 30 days
                pointStart: Date.UTC(2010, 03, 01),
                data: line1_data
                //yAxis: 1

            },
           {
                //type: 'area',
                name: 'Mention Frequency Index',
                //type: 'column',
                //type: 'scatter',
                pointStart: Date.UTC(2010, 03, 01),
                //data: [[Date.UTC(2010,03,01),40000],[Date.UTC(2012,3,1),60000]]
                data: line2_data,
                color: '#AA4643',
                yAxis: 1

            }]
        });
      //$(div_id).next().addClass('well');
    });

}
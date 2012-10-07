function createChart(data_unique) {
    var chart;
    $(document).ready(function() {
			
			
			chart = new Highcharts.Chart({
            chart: {
                renderTo: 'container',
                zoomType: 'x',
                spacingRight: 20
            },
            title: {
                text: 'Campaign Finance From x to the present'
            },
            subtitle: {
                text: document.ontouchstart === undefined ?
                    'Click and drag in the plot area to zoom in' :
                    'Drag your finger over the plot to zoom in'
            },
            xAxis: {
                type: 'datetime',
                maxZoom: 14 * 24 * 3600000, // fourteen days
                title: {
                    text: null
                }
            },
            yAxis: {
                title: {
                    text: 'Exchange rate'
                },
                min: 0,
                startOnTick: false,
                showFirstLabel: false
            },
            tooltip: {
                shared: true
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                area: {
                    fillColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1},
                        stops: [
                            [0, Highcharts.getOptions().colors[0]],
                            [1, 'rgba(2,0,0,0)']
                        ]
                    },
                    lineWidth: 1,
                    marker: {
                        enabled: false,
                        states: {
                            hover: {
                                enabled: true,
                                radius: 5
                            }
                        }
                    },
                    shadow: false,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    }
                }
            },
    
            series: [{
                type: 'area',
                name: 'USD to EUR',
                pointInterval: 24 * 3600 * 1000, // by day
                //pointInterval: 24 * 3600 * 1000 * 30, // by 30 days
                
                pointStart: Date.UTC(2010, 03, 01),
                data: data_unique
            }]
        });
    });
    
}
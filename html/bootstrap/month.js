d3.json("data/month_total.json", function(data) {
    nv.addGraph(function() {
        var chart = nv.models.lineChart()
                .interpolate("monotone")  
                .margin({left:80,right:40})    
                .tooltips(false)
                .x(function(d) { return d[0] })
                .y(function(d) { return d[1] });
                
        chart.xAxis
            .axisLabel("1 month");

        chart.yAxis
            .axisLabel("requests / min")
            .tickFormat(d3.format("d"));
            
        chart.xAxis.tickFormat(function(d) {
            var dx = data[0].values[d] && data[0].values[d][0] || 0;
            return d3.time.format('%d.%m')(new Date(d));
        });            

        d3.select("#chart_month")
            .datum(data)
            .transition().duration(500).call(chart);

        nv.utils.windowResize(
                function() {
                    chart.update();
                }
            );

        return chart;
    });
});

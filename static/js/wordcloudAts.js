
function WordCloudAts(user) {

    d3 = d3version3

    d3.select("#dynamic-viz").html("");

    var margin = {top: 20, right: 20, bottom: 40, left: 20},
        width = 800 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;
  
    var base_url = "/api/wordcloud/scikitatmentions/?identity="
    var identity = user
    var query_url = base_url + identity
    console.log(query_url)

    d3.json(query_url, function(data) {
    console.log(data)

    var categories = d3.keys(d3.nest().key(function(d) { return d.category; }).map(data));
    var color = d3.scale.ordinal().range(["#66c2a5","#fc8d62","#8da0cb","#e78ac3","#a6d854"]);
    var fontSize = d3.scale.pow().exponent(5).domain([0,1]).range([10,80]);

    var layout = d3.layout.cloud()
        .timeInterval(10)
        .size([width, height])
        .words(data)
        .rotate(function(d) { return 0; })
        .font('monospace')
        .fontSize(function(d,i) { return fontSize(Math.random()); })
        .text(function(d) { return d.password; })
        .spiral("archimedean")
        .on("end", draw)
        .start();

    var svg = d3.select('#dynamic-viz').append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var wordcloud = svg.append("g")
        .attr('class','wordcloud')
        .attr("transform", "translate(" + width/2 + "," + height/2 + ")");

    var x0 = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1)
        .domain(categories);

    var xAxis = d3.svg.axis()
        .scale(x0)
        .orient("bottom");

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll('text')
        .style('font-size','20px')
        .style('fill',function(d) { return color(d); })
        .style('font','sans-serif');

    function draw(words) {
        wordcloud.selectAll("text")
            .data(words)
            .enter().append("text")
            .attr('class','word')
            .style("font-size", function(d) { return d.WordSize + "px"; })
            .style("font-family", function(d) { return d.font; })
            .style("fill", function(d) { 
                var sentiment = d.OverallSentiment;
                if (sentiment === "Positive") {
                    var colour = "#18a2d6"
                }
                else if (sentiment === "Neutral"){
                    var colour = '#8ea5ad'
                }
                else if (sentiment === "Negative") {
                    var colour = 'red'
                }
                return colour
                // var paringObject = data.filter(function(obj) { return obj.password === d.text});
                // return color(paringObject[0].category); 
            })
            .attr("text-anchor", "middle")
            .attr("transform", function(d) { return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")"; })
            .text(function(d) { return d.AtMentions; });
    };

    });
};

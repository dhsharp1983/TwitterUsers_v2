

function scatter(name) {

    //removing the scatterplot
    d3.select("#scatter").html("");

    console.log(name);
    
    var identity = name;

    var margin = {top: 50, right: 30, bottom: 50, left: 60},
    width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
    
    // append the svg object to the body of the page
    var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform","translate(" + margin.left + "," + margin.top + ")")

    d3.json(`/api/dashboard/testscatter/?name=${name}`).then(function(data) {
        console.log("start graph")
        console.log(data)
        console.log(data.Retweets)
        
        // Add X axis
        var x = d3.scaleLinear()
        // .domain([0, 100000])
        .domain(d3.extent(data, d => d.Likes))
        .range([ 0, width ]);
        svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

        // Add Y axis
        var y = d3.scaleLinear()  
        // .domain([0, 100000])
        .domain(d3.extent(data, d => d.Retweets))
        .range([ height, 0]);
        svg.append("g")
        .call(d3.axisLeft(y));

        // Color scale: give me a specie name, I return a color
        var color = d3.scaleOrdinal()
        .domain(["-1", "0", "1" ])
        .range([ "red", "grey", "blue"])

        // create tooltop div
        var Tooltip = d3.select("#scatter")
            .append("div")
            .style("opacity", 0)
            .attr("class", "tooltip")
            .style("background-color", "white")
            .style("border", "solid")
            .style("border-width", "2px")
            .style("border-radius", "5px")
            .style("padding", "5px")

        // Three function that change the tooltip when user hover / move / leave a cell
        var mouseover = function(d) {
            Tooltip.style("opacity", 1)
            }
        var mousemove = function(d) {
            Tooltip.html("<b>Date: </b>" + d.Date + "<br>" + "<b>Tweet</b>: " + d.Tweet_Content)
            // Tooltip.html("tweet: ")
            .style("left", (d3.mouse(this)[0]+70) + "px")
            .style("top", (d3.mouse(this)[1] + 50) + "px")
        }
        var mouseleave = function(d) {
            Tooltip
            .style("opacity", 0)
        }

        // Add dots
        svg.append('g')
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) {return x(d.Likes)})
        .attr("cy", function (d) { return y(d.Retweets); } )
        .attr("r", 5)
        // .style("fill","black")
        .style("fill", function (d) { return color(d.Sentiment) } )
        .on("mouseover", mouseover )
        .on("mousemove", mousemove )
        .on("mouseleave", mouseleave )
        // // Add X axis
        // var x = d3.scaleLinear()
        // // .domain([0, 100000])
        // .domain(d3.extent(data, d => d.Likes))
        // .range([ 0, width ]);
        // svg.append("g")
        // .attr("transform", "translate(0," + height + ")")
        // .call(d3.axisBottom(x));

        // // Add Y axis
        // var y = d3.scaleLinear()  
        // // .domain([0, 100000])
        // .domain(d3.extent(data, d => d.Retweets))
        // .range([ height, 0]);
        // svg.append("g")
        // .call(d3.axisLeft(y));

        // text label for the x axis
        svg.append("text")             
            .attr("transform", "translate(" + (width/2) + " ," + (height + margin.top) + ")")
            .style("text-anchor", "middle")
            .text("Likes");

        // text label for the y axis
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left)
            .attr("x",0 - (height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Re-Tweets");   

        // chart title
        svg.append("text")
            .attr("x", (width / 2))             
            .attr("y", 0 - (margin.top / 2)-10)
            .attr("text-anchor", "middle")  
            .style("font-size", "16px") 
            .style("text-decoration", "underline")  
            .text(`${identity} Likes vs Retweets`);

        // // Add dots
        // svg.append('g')
        // .selectAll("dot")
        // .data(data)
        // .enter()
        // .append("circle")
        //     .attr("cx", function (d) { return x(d.Likes); } )
        //     .attr("cy", function (d) { return y(d.Retweets); } )
        //     // .attr("cx", function (d) { return x(d.Retweets); } )
        //     // .attr("cx", 0)
        //     // .attr("cy", function (d) { return y(d.Retweets); } )
        //     .attr("r", 2.5)
        //     .style("fill", "#69b3a2")


        // // new X axis
        // x.domain([0, 100000])
        // svg.select(".myXaxis")
        // .transition()
        // .duration(500)
        // .attr("opacity", "1")
        // .call(d3.axisBottom(x));

        // svg.selectAll("circle")
        // .transition()
        // .delay(function(d,i){return(i*.25)})
        // .duration(1000)
        // .attr("cx", function (d) { return x(d.Likes); } )
        // .attr("cy", function (d) { return y(d.Retweets); } )

        

    })
    .catch(function(error){
        console.log(error);
    })

}

scatter("Donald Trump")
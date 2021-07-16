
export function testfunction (name) {
    console.log("testfunction:" + name)
}

// function WordCloud1(name) {
//     d3 = d3version3;
//     console.log("start wordcloud function for" + name);
//   // d3.json(`/api/wordcloudpage/?name=${name}`).then((data) => {
//     d3.select("#dynamic-viz").html("");


//     var base_url = "/api/wordcloud/scikithashtags/?identity="
//     var identity = name
//     var query_url = base_url + identity

//     d3.json(query_url, function(data) {
//       console.log(data);

//     //   var width = $("svg").parent().width();
//     //   var height = $("svg").parent().height();
//       var margin = {top: 50, right: 30, bottom: 50, left: 60}

//       var color = d3.scale.linear()
//               .domain([0,1,2,3,4,5,6,10,15,20,100])
//               .range(["#ddd", "#ccc", "#bbb", "#aaa", "#999", "#888", "#777", "#666", "#555", "#444", "#333", "#222"]);
  
//       d3.layout.cloud().size([800, 600])
//               .words(data)
//               .rotate(0)
//               .fontSize(function(d) { return d.WordCount; })
//               .on("end", draw)
//               .start();
  
//       function draw(words) {
//           d3.select("#dynamic-viz").append("svg")
//                 //   .attr("width", 800)
//                 //   .attr("height", 600)
//                   .attr("width", '100%')
//                   .attr("height", '100%')
                  

//                   .attr("class", "wordcloud")
//                   .append("g")
//                   // without the transform, words words would get cutoff to the left and top, they would
//                   // appear outside of the SVG area
//                   .attr("transform","translate(" + margin.left + "," + margin.top + ")")
//                   .selectAll("text")
//                   .data(words)
//                   .enter().append("text")
//                   .style("font-size", function(d) { return d.WordCount + "px"; })
//                   .style("fill", function(d, i) { return color(i); })
//                   .attr("transform", function(d) {
//                       return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
//                   })
//                   .text(function(d) { return d.text; });
//       }

//     });
// };
// //   </script> 
// //   </div>
  





init();



function init() {
    d3 = d3version4
    console.log(d3.version)
    d3.json("/api/identitylist/", function(data) {
        var names = data.map(a => a.Identities);
        // appending the names to the dropdown list
        names.forEach(function(Append) {
            console.log(Append)
            var option = d3.select("#selDataset");
            option.append("option").text(Append);
        });
        sessionStorage.setItem('user', 'Akshay Kumar');
        sessionStorage.setItem('page','SentimentGraph1')
        SVGCaller("Akshay Kumar","sentiment-btn")
        // dashBoard("Akshay Kumar");
        // scatter("Akshay Kumar");
    });
};

// This function calls which SVG to plot 
function SVGCaller(user,page) {


    if (page === "word-cloud1-btn") {
        WordCloudAts(user)
        console.log("SVGCaller - User:" + user + ", Page: " + page)
    }

    else if (page === "word-cloud2-btn") {
        // testfunction(user)
        WordCloudHashs(user)
        console.log("SVGCaller - User:" + user + ", Page: " + page)
    }

    else if (page === "arc-diagram-btn") {
        // testfunction(user)
        ArcDiagram(user)
        console.log("SVGCaller - User:" + user + ", Page: " + page)
    }

    else if (page === "force-dir-btn") {
        // testfunction(user)
        ForceDiagram(user)
        console.log("SVGCaller - User:" + user + ", Page: " + page)
    }

    else if (page === "sentiment1-btn") {
        // testfunction(user)
        scikitscatterplot(user)
        console.log("SVGCaller - User:" + user + ", Page: " + page)
    }

    else if (page === "sentiment2-btn") {
        // testfunction(user)
        WordCloud1(user)
        console.log("SVGCaller - User:" + user + ", Page: " + page)
    }

    else if (page === "voroni-btn") {
        // testfunction(user)
        voroni(user)
        console.log("SVGCaller - User:" + user + ", Page: " + page)
    }

    else {
        console.log("page error!")
    };


    // if (page === "word-cloud1-btn") {
    //     voroni(user)
    // }
};

// function voroni(TwitterIdentity) {
    
//     if (TwitterIdentity = "Bill Gates") {
//         var iframeURL = 'src="https://observablehq.com/embed/@stu-vic/username-jtimberlake-average-positive-tweet-sentiment-68?cells=image"'
//     }
    
//     var iframebase = '<iframe width="100%" height="1331" frameborder="0 '
//     var iframeend = '></iframe>'

//     assemblediframe = iframebase + iframeURL + iframeend
    
//     d3.select("#divID").html(assemblediframe)
// };

function optionChanged(User) {
    var currentUser = User
    sessionStorage.setItem('user',currentUser)
    currentPage = sessionStorage.getItem('page')
    console.log("User Option Changed Function: page: " + currentPage + " user: " + currentUser)
    SVGCaller(currentUser,currentPage)
 // call the API with the name selected, so call ..../Katy Perry from the database
    // dashBoard(incomingData);
    // scatter(incomingData);
};

function ButtonClick(page) {
    sessionStorage.setItem('page',page)
    currentUser = sessionStorage.getItem('user')
    console.log("Button Click Function: page: " + page + " user: " + currentUser)
    SVGCaller(currentUser,page)
};




// HERE WAS THE PREVIOUS WORKING CODE 
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
//       var margin = {top: 220, right: 30, bottom: 50, left: 210}

//       var color = d3.scale.linear()
//               .domain([0,1,2,3,4,5,6,10,15,20,100])
//               .range(["#ddd", "#ccc", "#bbb", "#aaa", "#999", "#888", "#777", "#666", "#555", "#444", "#333", "#222"]);
  
//       d3.layout.cloud().size([900, 700])
//               .words(data)
//               .rotate(0)
//               .fontSize(function(d) { return d.WordCount; })
//               .on("end", draw)
//               .start();
  
//       function draw(words) {
//           d3.select("#dynamic-viz").append("svg")
//                 //   .attr("width", 800)
//                 //   .attr("height", 600)
//                   .attr("width", '110%')
//                   .attr("height", '125%')
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
//   </script> 
//   </div>
  



// function dashBoard(name) {

//     console.log(name);

//     d3.json(`/api/dashboard/?name=${name}`).then((data) => {

//         var data = data

//         console.log(data);

//         // d3.select("#user-totals").html("");
//         // d3.select("#month-totals").html("");
//         d3.select("#day-totals").html("");

//         // Object.entries(data).forEach(([key, value]) => {
//         //     if (key.includes('Total')) {
//         //         d3.select("#user-totals").append("h5").text(`${key}: ${value}`);
//         //     }
//         // });
        
//         // Object.entries(data).forEach(([key, value]) => {
//         //     if (key.includes('Month')) {
//         //         d3.select("#month-totals").append("h5").text(`${key}: ${value}`);
//         //     }
//         // });

//         Object.entries(data).forEach(([key, value]) => {
//             if (key.includes('Day')) {
//                 d3.select("#day-totals").append("h5").text(`${key}: ${value}`);
//             }
//         });
//     })
// }
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
        sessionStorage.setItem('page','voronoi-btn')
        SVGCaller("Akshay Kumar","voronoi-btn")
        UserStats("Akshay Kumar")
    });
};

// This function calls which SVG to plot 
function SVGCaller(user,page) {

    if (page === "word-cloud1-btn") {
        WordCloudAts(user)
        console.log("SVGCaller - User:" + user + ", Page: " + page)
    }
    else if (page === "word-cloud2-btn") {
        WordCloudHashs(user)
        console.log("SVGCaller - User:" + user + ", Page: " + page)
    }
    else if (page === "arc-diagram-btn") {
        ArcDiagram(user)
        console.log("SVGCaller - User:" + user + ", Page: " + page)
    }
    else if (page === "force-dir-btn") {
        ForceDiagram(user)
        console.log("SVGCaller - User:" + user + ", Page: " + page)
    }
    else if (page === "sentiment1-btn") {
        scikitscatterplot(user)
        console.log("SVGCaller - User:" + user + ", Page: " + page)
    }
    else if (page === "sentiment2-btn") {
        WordCloud1(user)
        console.log("SVGCaller - User:" + user + ", Page: " + page)
    }
    else if (page === "voronoi-btn") {
        voroni(user)
        console.log("SVGCaller - User:" + user + ", Page: " + page)
    }
    else if (page === "ranking-btn") {
        RankingGraph(user)
        console.log("SVGCaller - User:" + user + ", Page: " + page)
    }
    
    else {
        console.log("page error!")
    };
};

function optionChanged(User) {
    var currentUser = User
    sessionStorage.setItem('user',currentUser)
    currentPage = sessionStorage.getItem('page')
    console.log("User Option Changed Function: page: " + currentPage + " user: " + currentUser)
    SVGCaller(currentUser,currentPage)
    UserStats(User)
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

function ArcDiagram(user) {
    d3 = d3version5
    iframehtml = '<iframe width="100%" height="800" frameborder="0" src="https://observablehq.com/embed/@stu-vic/arc-diagram?cells=chart"></iframe>'
    console.log("ArcDiagram Function: " + iframehtml)
    
    d3.select("#dynamic-viz").html("")
    d3.select("#dynamic-viz").html(iframehtml)
}

function ForceDiagram(user) {
    d3 = d3version5
    iframehtml = '<iframe width="100%" height="800" frameborder="0" src="https://observablehq.com/embed/@stu-vic/force-directed-graph?cells=chart"></iframe>'
    console.log("ForceDiagram Function: " + iframehtml)
    
    d3.select("#dynamic-viz").html("")
    d3.select("#dynamic-viz").html(iframehtml)
}

function RankingGraph(user) {
    d3 = d3version4
    
    d3.select("#dynamic-viz").html("")
    d3.select("#dynamic-viz").html("<div class='tableauPlaceholder' id='viz1626452245803' style='position: relative'><noscript><a href='#'><img alt='Top 50 Twitter users by amount of followers ' src='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Fi&#47;Finalprojectmaterials2&#47;Top50userranking&#47;1_rss.png' style='border: none' /></a></noscript><object class='tableauViz'  style='display:none;'><param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' /> <param name='embed_code_version' value='3' /> <param name='site_root' value='' /><param name='name' value='Finalprojectmaterials2&#47;Top50userranking' /><param name='tabs' value='no' /><param name='toolbar' value='yes' /><param name='static_image' value='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Fi&#47;Finalprojectmaterials2&#47;Top50userranking&#47;1.png' /> <param name='animate_transition' value='yes' /><param name='display_static_image' value='yes' /><param name='display_spinner' value='yes' /><param name='display_overlay' value='yes' /><param name='display_count' value='yes' /><param name='language' value='en-GB' /><param name='filter' value='publish=yes' /></object></div>                <script type='text/javascript'>                    var divElement = document.getElementById('viz1626452245803');                    var vizElement = divElement.getElementsByTagName('object')[0];                    vizElement.style.width='100%';vizElement.style.height=(divElement.offsetWidth*0.75)+'px';                    var scriptElement = document.createElement('script');                    scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';                    vizElement.parentNode.insertBefore(scriptElement, vizElement);                </script>")
}


function UserStats(user) {
    d3 = d3version5
    var identity = user
    //removing the previous entries 
    d3.select("#BioImage").html("");
    d3.select("#UserBio").html("");
    d3.select("#UserStats").html("");

    d3.json(`/api/dashboard/useroverview/?identity=${user}`).then(function(data) {

        UserSummary = data.WikiSummary

        identity = identity.replace(/\s/g, '');
        var jpgpath = "/static/images/" + identity + ".jpg"
        var htmljpg = '<img src="' + jpgpath + '" alt="' + user + '" height="200" width="auto">'
        console.log(data)

        d3.select("#UserPic").html(htmljpg)

        d3.select("#UserBio").html("" + UserSummary + "")
        var AvgTweetsPerDay = data.AvgTweetsPerDay
        var AvgLikesPerDay = data.AvgLikesPerDay
        var AvgAtMentionsPerDay = data.AvgAtMentionsPerDay
        var AvgHashtagsPerDay = data.AvgHashtagsPerDay

        var RankingByNumFollowers = data.RankingByNumFollowers
        var RankingByPositiveSentiment = data.RankingByPositiveSentiment

        // var AvgReTweetsPerDay = data.AvgReTweetsPerDay
        var AvgLikesPerTweet = data.AvgLikesPerTweet

        var PercentPositiveTweets = data.PercentPositiveTweets
        var PercentNeutralTweets = data.PercentNeutralTweets
        var PercentNegativeTweets = data.PercentNegativeTweets




        var test = "<h5>Average Tweets Per Day: " + AvgTweetsPerDay + "</h5>"




        console.log(AvgTweetsPerDay)

        var dataarray = Object.values(data)
        console.log(dataarray)
        // d3.select("#UserStats").html("<h5>Average Tweets per Day: " + data.AvgTweetsPerDay + "</h5>")
        var table = d3.select("#UserStats").append("table")
        // var thead = table.append("thead");
        // var tbody = table.append("tbody");
        // var rows = tbody.selectAll("tr")
            // .data(dataarray)
            // .enter()
            // .append("tr")
            // .append("td")
            .append("tbody")
            .append("tr")
            .html("<h6><b>Average Tweets Per Day:</b> " + AvgTweetsPerDay + "</h6>")
            .append("tr")
            .append("td")
            .html("<h6><b>Average Likes Per Day:</b> " + AvgLikesPerDay + "</h6>")
            .append("tr")
            .append("td")
            .html("<h6><b>Average @Mentions Per Day:</b> " + AvgAtMentionsPerDay + "</h6>")
            .append("tr")
            .append("td")
            .html("<h6><b>Average #tags Per Day:</b> " + AvgHashtagsPerDay + "</h6>")
            .append("tr")
            .append("td")
            .html("<br>")
            .append("tr")
            .append("td")
            .html("<h6><b>Ranking By Number of Followers:</b> " + RankingByNumFollowers + " / 50</h6>")
            .append("tr")
            .append("td")
            .html("<h6><b>Ranking By Positive Sentiment:</b> " + RankingByPositiveSentiment + " / 50</h6>")
            .append("tr")
            .append("td")
            .html("<br>")
            .append("tr")
            .append("td")
            .html("<h6><b>Average Likes Per Tweet:</b> " + AvgLikesPerTweet + "</h6>")
            .append("tr")
            .append("td")
            .html("<br>")
            .append("tr")
            .append("td")
            .html("<h6><b>Percent Positive Tweets:</b> " + PercentPositiveTweets + "</h6>")
            .append("tr")
            .append("td")
            .html("<h6><b>Percent Neutral Tweets:</b> " + PercentNeutralTweets + "</h6>")
            .append("tr")
            .append("td")
            .html("<h6><b>Percent Negative Tweets:</b> " + PercentNegativeTweets + "</h6>")

            });
            
        // var table = d3.select("#UserStats").append("table");
        // var thead = table.append("thead")
        // var tbody = table.append("tbody");
        // var rows = tbody.selectAll("tr")
        //     .data(data)
        //     .enter()
        //     .append("tr")
        //     .append("td")
        //     .html("<h5>Average Tweets per Day: " + AvgTweetsPerDay + "</h5>")

        // AvgAtMentionsPerDay: 
        // AvgHashtagsPerDay: 
        // AvgLikesPerDay: 
        // AvgLikesPerTweet: 
        // AvgReTweetsPerDay: 
        // PercentNegativeTweets:
        // PercentNeutralTweets: 
        // PercentPositiveTweets: 
        // RankingByNumFollowers: 
        // RankingByPositiveSentiment: 
        
        

        // console.log("UserStats")
        // console.log(data)
        // console.log(data.WikiSummary)

        
        // var UserBio = d3.select("#UserBio").append("UserBio");
        // var thead = UserBio.append("thead")
        // var tbody = thead.append("tbody");
        // var rows = tbody.selectAll("tr")
        //     .data(meta_array)
        //     .enter()
        //     .append("tr")
        //     .append("td")
        //     .text(function(d) {
        //         return d.WikiSummary
        //     });
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
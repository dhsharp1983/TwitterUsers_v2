
function voroni(TwitterIdentity) {
    console.log("Voroni Triggered")
    d3 = d3version5

    d3.select("#dynamic-viz").html("")

    if (TwitterIdentity === "Akshay Kumar") {
        var iframeURL = 'src="https://observablehq.com/embed/@stu-vic/username-jtimberlake-average-positive-tweet-sentiment-68?cells=image"'
    }
    else if (TwitterIdentity === "Amitabh Bachchan") {
        // code here
    }
    // continue else if, end with else 
    
    var iframebase = '<iframe width="100%" height="750" frameborder="0" '
    var iframeend = '></iframe>'

    assemblediframe = iframebase + iframeURL + iframeend
    console.log(assemblediframe)
    
    d3.select("#dynamic-viz").html(assemblediframe)
};
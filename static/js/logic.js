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
    })
};

// This function calls which SVG to plot 
function SVGCaller(user,page) {
    // console.log("SVG Caller: " + user + " " + page)
    if (page === "sentiment1-btn") {
        scikitscatterplot(user)
    }

    else if (page === "word-cloud1-btn") {
        defme(user)
        console.log("SVGCaller Calls" + user + " for " + page)
    };

    // if (page === "word-cloud1-btn") {
    //     voroni(user)
    // }
}

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

function ButtonClick(ButtonID) {
    var page = ButtonID
    sessionStorage.setItem('page',ButtonID)
    currentUser = sessionStorage.getItem('user')
    console.log("Button Click Function: page: " + ButtonID + " user: " + currentUser)
    SVGCaller(currentUser,page)
};






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
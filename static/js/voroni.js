
function voroni(TwitterIdentity) {
    console.log("Voroni Triggered")
    d3 = d3version5

    d3.select("#dynamic-viz").html("")
    
    if (TwitterIdentity === "Akshay Kumar") {
        var iframeURL = 'src="https://observablehq.com/embed/@stu-vic/voronoi-stippling/2?cells=image"'
    }
    
    else if (TwitterIdentity === "Amitabh Bachchan") {
        var iframeURL = 'src="https://observablehq.com/embed/@stu-vic/username-srbachchan-average-positive-tweet-sentiment-61-s?cells=image"'
    }
   
    else if (TwitterIdentity === "Ariana Grande") {
        var iframeURL = 'src="https://observablehq.com/embed/@stu-vic/username-arianagrande-average-positive-tweet-sentiment-6?cells=image"'
    }
     
    else if (TwitterIdentity === "Barack Obama") {
        var iframeURL = 'src="https://observablehq.com/embed/@stu-vic/usern-me-barackobama-average-positive-tweet-sentiment-69-s?cells=image"'
    }
     
    else if (TwitterIdentity === "BBC") {
        var iframeURL = 'src="https://observablehq.com/embed/@stu-vic/username-bbcbreaking-average-positive-tweet-sentiment-56?cells=image"' 
    }
    else if (TwitterIdentity === "Bill Gates") {
        var iframeURL = 'src="https://observablehq.com/embed/@stu-vic/usern-me-billgates-average-positive-tweet-sentiment-72-sen?cells=image"'
    }
     
    else if (TwitterIdentity === "Britney Spears") {
        var iframeURL = 'src="https://observablehq.com/embed/@stu-vic/usern-me-britneyspears-average-positive-tweet-sentiment-7?cells=image"'
    }
    else if (TwitterIdentity === "Bruno Mars") {
        var iframeURL = 'src="https://observablehq.com/embed/@stu-vic/username-brunomars-average-positive-tweet-sentiment-61-se?cells=image"'
    }
     
    else if (TwitterIdentity === "CNN") {
        var iframeURL = 'src="https://observablehq.com/embed/@stu-vic/username-cnn-average-positive-tweet-sentiment-67-sentimen?cells=image"'    
    }
    else if (TwitterIdentity === "CNN Breakingn") {
        var iframeURL = 'src="https://observablehq.com/embed/@stu-vic/username-cnnbrk-average-positive-tweet-sentiment-58-senti?cells=image"'
    }
    
    else if (TwitterIdentity === "Cristiano Ronaldo") {
        var iframeURL = 'src="https://observablehq.com/embed/@stu-vic/usern-me-cristiano-average-positive-tweet-sentiment-71-sen?cells=image"'
    }
    else if (TwitterIdentity === "Donald Trump") {
        var iframeURL = 'src="https://observablehq.com/embed/@stu-vic/username-realdonaldtrump-average-positive-tweet-sentime?cells=image"'
    }
     
    else if (TwitterIdentity === "Drake") {
        var iframeURL = 'src="https://observablehq.com/embed/@stu-vic/username-drake-average-positive-tweet-sentiment-64-sentim?cells=image"'   
    }
    else if (TwitterIdentity === "ESPN") {
        var iframeURL = 'src="https://observablehq.com/embed/@stu-vic/username-espn-average-positive-tweet-sentiment-63-sentime?cells=image"'
    }
     
    else if (TwitterIdentity === "FC Barcelona") {
        var iframeURL = 'src="https://observablehq.com/embed/@stu-vic/username-fcbarcelona-average-positive-tweet-sentiment-63?cells=image"'
    }
    else if (TwitterIdentity === "Harry Styles") {
        var iframeURL = 'src="https://observablehq.com/embed/@stu-vic/usern-me-harry_styles-average-positive-tweet-sentiment-68?cells=image"'
    }
     
    else if (TwitterIdentity === "Instagram") {
        var iframeURL = 'src="https://observablehq.com/embed/@stu-vic/username-instagram-average-positive-tweet-sentiment-63-se?cells=image"'    
    }
    else if (TwitterIdentity === "J Lo") {
        var iframeURL = 'src="https://observablehq.com/embed/@stu-vic/username-jlo-average-positive-tweet-sentiment-64-sentimen?cells=image"'
    }
     
    else if (TwitterIdentity === "Jimmy Fallon") {
        var iframeURL = 'src="https://observablehq.com/embed/@stu-vic/username-jimmyfallon-average-positive-tweet-sentiment-68?cells=image"'
    }
    else if (TwitterIdentity === "Justin Bieber") {
        var iframeURL = 'src="https://observablehq.com/embed/@stu-vic/username-justinbieber-average-positive-tweet-sentiment-6?cells=image"'
    }
     
    else if (TwitterIdentity === "Justin Timberlake") {
        var iframeURL = 'src="https://observablehq.com/embed/@stu-vic/username-jtimberlake-average-positive-tweet-sentiment-68?cells=image"'    
    }
    else if (TwitterIdentity === "Katy Perry") {
        var iframeURL = 'src="https://observablehq.com/embed/@stu-vic/username-katyperry-average-positive-tweet-sentiment-64-se?cells=image"'
    }
     
    else if (TwitterIdentity === "Kevin Hart") {
        var iframeURL = 'src="https://observablehq.com/embed/@stu-vic/usern-me-kevinhart4real-average-positive-tweet-sentiment?cells=image"'
    }
    else if (TwitterIdentity === "Kim Kardashian") {
        var iframeURL = 'src="https://observablehq.com/embed/@stu-vic/usern-me-kimkardashian-average-positive-tweet-sentiment-6?cells=image"'
    }
     
    else if (TwitterIdentity === "Lady Gaga") {
        var iframeURL = 'src="https://observablehq.com/embed/@stu-vic/usern-me-ladygaga-average-positive-tweet-sentiment-70-sent?cells=image"'    
    }
    else if (TwitterIdentity === "Le Bron James") {
        var iframeURL = 'src="https://observablehq.com/embed/@stu-vic/usern-me-kingjames-average-positive-tweet-sentiment-70-sen?cells=image"'
    }
     
    else if (TwitterIdentity === "Liam Payne") {
        var iframeURL = 'src="https://observablehq.com/embed/@stu-vic/usern-me-liampayne-average-positive-tweet-sentiment-70-sen?cells=image"'
    }
    else if (TwitterIdentity === "Lil Wayne") {
        var iframeURL = 'src="https://observablehq.com/embed/@stu-vic/username-liltunechi-average-positive-tweet-sentiment-62-s?cells=image"'
    }
     
    else if (TwitterIdentity === "Louis Tomlinson") {
        var iframeURL = 'src="https://observablehq.com/embed/@stu-vic/usern-me-louis_tomlinson-average-positive-tweet-sentimen?cells=image"'    
    }
     
    else if (TwitterIdentity === "Miley Cyrus") {
        var iframeURL = 'src="https://observablehq.com/embed/@stu-vic/username-mileycyrus-average-positive-tweet-sentiment-59-s?cells=image"'
    }
    else if (TwitterIdentity === "Narendra Modi") {
        var iframeURL = 'src="https://observablehq.com/embed/@stu-vic/usern-me-narendramodi-average-positive-tweet-sentiment-70?cells=image"'
    }
     
    else if (TwitterIdentity === "NASA") {
        var iframeURL = 'src="https://observablehq.com/embed/@stu-vic/username-nasa-average-positive-tweet-sentiment-75-sentime?cells=image"'    
    }
    else if (TwitterIdentity === "Neymar Jr") {
        var iframeURL = 'src="https://observablehq.com/embed/@stu-vic/username-neymarjr-average-positive-tweet-sentiment-53-sen?cells=image"'
    }
     
    else if (TwitterIdentity === "Niall Horan") {
        var iframeURL = 'src="https://observablehq.com/embed/@stu-vic/usern-me-niallofficial-average-positive-tweet-sentiment-6?cells=image"'
    }
    else if (TwitterIdentity === "NY Times") {
        var iframeURL = 'src="https://observablehq.com/embed/@stu-vic/username-nytimes-average-positive-tweet-sentiment-64-sent?cells=image"'
    }
    
    else if (TwitterIdentity === "Oprah Winfrey") {
        var iframeURL = 'src="https://observablehq.com/embed/@stu-vic/usern-me-oprah-average-positive-tweet-sentiment-72-sentime?cells=image"'    
    }
     
    else if (TwitterIdentity === "Pink") {
        var iframeURL = 'src="https://observablehq.com/embed/@stu-vic/usern-me-pink-average-positive-tweet-sentiment-72-sentimen?cells=image"'    
    }
    else if (TwitterIdentity === "Real Madrid") {
        var iframeURL = 'src="https://observablehq.com/embed/@stu-vic/username-realmadrid-average-positive-tweet-sentiment-52-s?cells=image"'
    }
    
    else if (TwitterIdentity === "Rihanna") {
        var iframeURL = 'src="https://observablehq.com/embed/@stu-vic/username-rihanna-average-positive-tweet-sentiment-61-sent?cells=image"'
    }
    else if (TwitterIdentity === "Salman Khan") {
        var iframeURL = 'src="https://observablehq.com/embed/@stu-vic/username-beingsalmankhan-average-positive-tweet-sentime?cells=image"'
    }
     
    else if (TwitterIdentity === "Selena Gomez") {
        var iframeURL = 'src="https://observablehq.com/embed/@stu-vic/usern-me-selenagomez-average-positive-tweet-sentiment-68-s?cells=image"'    
    }
     
    else if (TwitterIdentity === "Shah Rukh Khan") {
        var iframeURL = 'src="https://observablehq.com/embed/@stu-vic/username-iamsrk-average-positive-tweet-sentiment-73-senti?cells=image"'    
    }
    else if (TwitterIdentity === "Shakira") {
        var iframeURL = 'src="https://observablehq.com/embed/@stu-vic/username-shakira-average-positive-tweet-sentiment-63-sent?cells=image"'
    }
    
    else if (TwitterIdentity === "Sports Center") {
        var iframeURL = 'src="https://observablehq.com/embed/@stu-vic/username-sportscenter-average-positive-tweet-sentiment-6?cells=image"'
    }
    else if (TwitterIdentity === "Taylor Swift") {
        var iframeURL = 'src="https://observablehq.com/embed/@stu-vic/username-taylorswift13-average-positive-tweet-sentiment?cells=image"'
    }
    
    else if (TwitterIdentity === "The Ellen Show") {
        var iframeURL = 'src="https://observablehq.com/embed/@stu-vic/username-theellenshow-average-positive-tweet-sentiment-7?cells=image"'    
    }
    
    else if (TwitterIdentity === "Twitter") {
        var iframeURL = 'src="https://observablehq.com/embed/@stu-vic/username-twitter-average-positive-tweet-sentiment-58-sent?cells=image"'    
    }
    else if (TwitterIdentity === "Virat Kohli") {
        var iframeURL = 'src="https://observablehq.com/embed/@stu-vic/username-imvkohli-average-positive-tweet-sentiment-76-sen?cells=image"'
    // continue else if, end with else   
    }
    else if (TwitterIdentity === "Wiz Khalifa") {
        var iframeURL = 'src="https://observablehq.com/embed/@stu-vic/username-wizkhalifa-average-positive-tweet-sentiment-62-s?cells=image"'
    }
    else (TwitterIdentity === "Youtube") {
        var iframeURL = 'src="https://observablehq.com/embed/@stu-vic/username-youtube-average-positive-tweet-sentiment-66-sent?cells=image"'
       
    }
        
    var iframebase = '<iframe width="100%" height="800" frameborder="0" '
    var iframeend = '></iframe>'

    assemblediframe = iframebase + iframeURL + iframeend
    console.log(assemblediframe)
    
    d3.select("#dynamic-viz").html(assemblediframe)
};
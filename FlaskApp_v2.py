# app.py
# v2 - 10:34pm
from flask import Flask, json, request, jsonify, Response, render_template
from pprint import pprint
import pymongo
from bson.json_util import dumps, loads
import numpy as np
import pandas as pd

# Set master flask app name 
app = Flask(__name__)

# set up global DB connection
client = pymongo.MongoClient("mongodb+srv://AtlasTwitter:1FineTwitterApp!@twittercluster.ycq9k.mongodb.net/")

# Define global word count function 
def word_count(input):
    counts = dict()
    for word in input:
        if word in counts:
            counts[word] += 1
        else:
            counts[word] = 1
    return counts

@app.route("/api/identitylist/")
def list_identities():
    Identity_List = ['Akshay Kumar', 'Amitabh Bachchan', 'Ariana Grande', 'Barack Obama', 'BBC', 'Bill Gates', 'Britney Spears', 'Bruno Mars', 'CNN Breaking', 'CNN', 'Cristiano Ronaldo', 'Donald Trump', 'Drake', 'ESPN', 'FC Barcelona', 'Harry Styles', 'Instagram', 'Jimmy Fallon', 'J Lo', 'Justin Bieber', 'Justin Timberlake', 'Katy Perry', 'Kevin Hart', 'Kim Kardashian', 'Lady Gaga', 'Le Bron James', 'Liam Payne', 'Lil Wayne', 'Louis Tomlinson', 'Miley Cyrus', 'Narendra Modi', 'NASA', 'Neymar Jr', 'Niall Horan', 'NY Times', 'Oprah', 'Pink', 'Real Madrid', 'Rihanna', 'Salman Khan', 'Selena Gomez', 'Shah Rukh Khan', 'Shakira', 'Sports Center', 'Taylor Swift', 'The Ellen Show', 'Twitter', 'Virat Kohli', 'Wiz Khalifa', 'Youtube']
    Identities_df = pd.DataFrame(Identity_List,columns=['Identities'])
    return Response(Identities_df.to_json(orient="records"), mimetype='application/json')

@app.route("/api/dashboard/testscatter/", methods=['GET'])
def scatterResults():

    # Set Up Test Scatter 
    mongo_db = client["testDB"]
    mongo_collection = mongo_db["test_sentiment"]
    
    # set QueryIdentity from API GET, clean out commas
    QueryIdentity = request.args.get("name",None)
    print(f"got name {QueryIdentity}")
    if QueryIdentity.startswith('"') and QueryIdentity.endswith('"'):
        QueryIdentity = QueryIdentity[1:-1]
        print(f"revised name {QueryIdentity}")
    
    # Query database for relevant identity and return as JSON 
    scatter_df = pd.DataFrame(list(mongo_collection.find({"Identity": QueryIdentity} ,{ "_id": 0, "Likes": 1, "Retweets" : 1, "Sentiment": 1, "Tweet Content": 1, "Date": 1} )))
    scatter_df.rename(columns={"Tweet Content": "Tweet_Content"}, inplace=True)
    scatter_json = scatter_df.to_json(orient="records")
    return scatter_json

@app.route("/api/dashboard/scikitscatterplot/", methods=['GET'])
def scikitscatterplot():

    # Set Up Test Scatter 
    mongo_db = client["Tweets_DB"]
    mongo_collection = mongo_db["Tweets_v2"]
    
    # set QueryIdentity from API GET, clean out commas
    QueryIdentity = request.args.get("identity",None)
    print(f"got name {QueryIdentity}")
    if QueryIdentity.startswith('"') and QueryIdentity.endswith('"'):
        QueryIdentity = QueryIdentity[1:-1]
        print(f"revised name {QueryIdentity}")
    
    # Query database for relevant identity and return as JSON 
    scatter_df = pd.DataFrame(list(mongo_collection.find({"Identity": QueryIdentity} ,{ "_id": 0, "Likes": 1, "Retweets" : 1, "Sentiment": 1, "Tweet Content": 1, "Date": 1} )))
    scatter_df.rename(columns={"Tweet Content": "Tweet_Content"}, inplace=True)
    scatter_json = scatter_df.to_json(orient="records")
    return scatter_json

@app.route("/api/dashboard/useroverview/", methods=['GET'])
def useroverview():
    # for reference, dev call structure is:
    # http://127.0.0.1:5000/api/dashboard/useroverview/?identity=%22Jimmy%20Fallon%22

    # setup mongo
    mongo_db = client["Tweets_DB"]
    mongo_collection = mongo_db["Tweets_v2"]
    mongo_user_collection = mongo_db["Users_Table"]
    
    # set QueryIdentity from API GET, clean out commas
    QueryIdentity = request.args.get("identity",None)
    print(f"got name {QueryIdentity}")
    if QueryIdentity.startswith('"') and QueryIdentity.endswith('"'):
        QueryIdentity = QueryIdentity[1:-1]
        print(f"revised name {QueryIdentity}")

    # query database 
    user_df = pd.DataFrame(list(mongo_user_collection.find({"Identity": QueryIdentity} )))
    tweet_df = pd.DataFrame(list(mongo_collection.find({"Identity": QueryIdentity} )))

    # Read In Date / Time 
    tweet_df['Time'] = pd.to_datetime(tweet_df["Time"],format='%H:%M:%S')
    tweet_df["Date"] = pd.to_datetime(tweet_df["Date"],format="%Y-%m-%d")

    # perform calculations
    RankingByNumFollowers = user_df.iloc[0]['Ranking_by_followers']
    RankingByPositiveSentiment = user_df.iloc[0]['Tweet_Positivity_Rank']
    WikiSummary = user_df.iloc[0]['WikiSummary']

    # Group DF by Day, get stats 
    identity_groupby_day_df = tweet_df.groupby(pd.Grouper(key='Date', freq='D'))
    AvgTweetsPerDay = round(identity_groupby_day_df['Tweet Id'].count().mean())
    AvgLikesPerDay = round(identity_groupby_day_df['Likes'].sum().mean())
    AvgReTweetsPerDay = round(identity_groupby_day_df['Retweets'].sum().mean())
    AvgAtMentionsPerDay = round(identity_groupby_day_df['Total @'].sum().mean())
    AvgHashtagsPerDay = round(identity_groupby_day_df['Total #'].sum().mean())

    # more calculations 
    TotalTweets = tweet_df['Tweet Id'].count()
    TotalLikes = tweet_df['Likes'].sum()
    AvgLikesPerTweet = TotalLikes / TotalTweets

    # more calculations for sentiment 
    sentiment_groupby_df = tweet_df.groupby(['Sentiment']).count()
    sentiment_groupby_df.reset_index(inplace=True)
    PercentPositiveTweets = (sentiment_groupby_df['Tweet Id'].loc[sentiment_groupby_df['Sentiment'] == 1.0].iloc[0] / TotalTweets) * 100
    PercentNeutralTweets = (sentiment_groupby_df['Tweet Id'].loc[sentiment_groupby_df['Sentiment'] == 0].iloc[0] / TotalTweets) * 100
    PercentNegativeTweets = (sentiment_groupby_df['Tweet Id'].loc[sentiment_groupby_df['Sentiment'] == -1.0].iloc[0] / TotalTweets) * 100

    # create dictionary of values to return
    User_Data_Stats = {
        'AvgLikesPerTweet': round(AvgLikesPerTweet,0),
        'RankingByNumFollowers': RankingByNumFollowers,
        'RankingByPositiveSentiment': int(RankingByPositiveSentiment),
        'WikiSummary': WikiSummary,
        'PercentPositiveTweets': round(PercentPositiveTweets,1),
        'PercentNeutralTweets': round(PercentNeutralTweets,1),
        'PercentNegativeTweets': round(PercentNegativeTweets,1),
        "AvgTweetsPerDay": AvgTweetsPerDay,
        "AvgLikesPerDay": AvgLikesPerDay,
        "AvgReTweetsPerDay": AvgReTweetsPerDay,
        "AvgAtMentionsPerDay": AvgAtMentionsPerDay,
        "AvgHashtagsPerDay": AvgHashtagsPerDay
    }

    # return as json 
    tweet_json_data = dumps(User_Data_Stats, indent=2)
    return tweet_json_data

@app.route('/getmsg/', methods=['GET'])
def respond():
    # Retrieve the name from url parameter
    name = request.args.get("name", None)
    # For debugging
    print(f"got name {name}")
    response = {}
    # Check if user sent a name at all
    if not name:
        response["ERROR"] = "no name found, please send a name."
    # Check if the user entered a number not a name
    elif str(name).isdigit():
        response["ERROR"] = "name can't be numeric."
    # Now the user entered a valid name
    else:
        response["MESSAGE"] = f"Welcome {name} to our awesome platform!!"
    # Return the response in json format
    return jsonify(response)

@app.route("/api/wordcloud/testhashtags/", methods=['GET'])
def HashWordCloud():
    # for reference, dev call structure is:
    # http://127.0.0.1:5000/api/wordcloud/?identity=%22Jimmy%20Fallon%22

    # get twitter identity from API URL query / call 
    QueryIdentity = request.args.get("identity", None)
    print(f"got name {QueryIdentity}")
    if QueryIdentity.startswith('"') and QueryIdentity.endswith('"'):
        QueryIdentity = QueryIdentity[1:-1]
        print(f"revised name {QueryIdentity}")
    # set up database connection
    mongo_db = client["testDB"]
    mongo_collection = mongo_db["test_sentiment"]
    # query db
    output =  mongo_collection.find( { "Identity": QueryIdentity, "Hashtags(#)": {"$ne" : '[]'} },{ "_id": 0, "Hashtags(#)": 1, "Sentiment": 1} )
    # convert to dataframe
    output_df = pd.DataFrame(list(output))
    # filter out empty hashtags 
    filtered_df = output_df[output_df['Hashtags(#)'].apply(len).gt(0)]
    exploded_df = filtered_df.explode('Hashtags(#)')

    exploded_group_df = exploded_df.groupby(['Hashtags(#)'])
    exploded_group_df = exploded_df.groupby(['Hashtags(#)']).count()
    exploded_group_df['WordCount'] = exploded_df.groupby(['Hashtags(#)']).count()
    exploded_group_df['AvgSentiment'] = exploded_df.groupby(['Hashtags(#)']).mean()
    exploded_group_df.drop('Sentiment', 1, inplace = True)

    # function to group sentiment values and categorise 
    def GroupSentiment(AvgSentiment):
        if AvgSentiment >= .4:
            return "Positive"
        if AvgSentiment >-.4 and AvgSentiment < .4:
            return "Neutral"
        if (AvgSentiment <.4 and AvgSentiment >= -1):
            return "Negative"
            
    # Run Group Sentiment function to bin sentiment values, sort ascending, get top 200, return as JSON
    exploded_group_df['OverallSentiment'] = exploded_group_df['AvgSentiment'].apply(GroupSentiment)
    exploded_group_df.sort_values(['WordCount'], ascending=False, inplace=True)
    return_df = exploded_group_df.head(200)
    return_df.reset_index(inplace = True)
    return Response(return_df.to_json(orient="records"), mimetype='application/json')    
    ## these records have been stored as arrays and this code isnt needed anymore 
    # HashTagArray = [eval(x) for x in output_df["Hashtags(#)"]]
    # flattened_Hashtag_list = []
    # for l1 in HashTagArray:
    #     for l2 in l1:
    #         flattened_Hashtag_list.append(l2)
    # hashtag_dict = word_count(flattened_Hashtag_list)
    # dict_df = pd.DataFrame()
    # dict_df = pd.DataFrame(list(hashtag_dict.items()),columns = ['text','size']) 
    # dict_df.sort_values(['size'], ascending=False, inplace=True)
    # dict_df = dict_df.head(200)


@app.route("/api/wordcloud/testatmentions/", methods=['GET'])
def AtWordCloud():
    # for reference, dev call structure is:
    # http://127.0.0.1:5000/api/wordcloud/?identity=%22Jimmy%20Fallon%22

    # get twitter identity from API URL query / call 
    QueryIdentity = request.args.get("identity", None)
    print(f"got name {QueryIdentity}")
    if QueryIdentity.startswith('"') and QueryIdentity.endswith('"'):
        QueryIdentity = QueryIdentity[1:-1]
        print(f"revised name {QueryIdentity}")
    # set up database connection
    mongo_db = client["testDB"]
    mongo_collection = mongo_db["test_sentiment"]
    # query db
    output =  mongo_collection.find( { "Identity": QueryIdentity, "Mentions(@)": {"$ne" : '[]'} },{ "_id": 0, "Mentions(@)": 1, "Sentiment": 1} )
    # convert to dataframe
    output_df = pd.DataFrame(list(output))
    # filter out empty hashtags 
    filtered_df = output_df[output_df['Mentions(@)'].apply(len).gt(0)]
    exploded_df = filtered_df.explode('Mentions(@)')

    exploded_group_df = exploded_df.groupby(['Mentions(@)'])
    exploded_group_df = exploded_df.groupby(['Mentions(@)']).count()
    exploded_group_df['WordCount'] = exploded_df.groupby(['Mentions(@)']).count()
    exploded_group_df['AvgSentiment'] = exploded_df.groupby(['Mentions(@)']).mean()
    exploded_group_df.drop('Sentiment', 1, inplace = True)

    # function to group sentiment values and categorise 
    def GroupSentiment(AvgSentiment):
        if AvgSentiment >= .4:
            return "Positive"
        if AvgSentiment >-.4 and AvgSentiment < .4:
            return "Neutral"
        if (AvgSentiment <.4 and AvgSentiment >= -1):
            return "Negative"
            
    # Run Group Sentiment function to bin sentiment values, sort ascending, get top 200, return as JSON
    exploded_group_df['OverallSentiment'] = exploded_group_df['AvgSentiment'].apply(GroupSentiment)
    exploded_group_df.sort_values(['WordCount'], ascending=False, inplace=True)
    return_df = exploded_group_df.head(200)
    return_df.reset_index(inplace = True)
    return Response(return_df.to_json(orient="records"), mimetype='application/json')   


@app.route('/')
def index():
    return render_template("index.html")


if __name__ == '__main__':
    # Threaded option to enable multiple instances for multiple user access support
    app.run(threaded=True, port=5000)





# global_df = pd.DataFrame()

# def word_count(input):
#     counts = dict()
#     for word in input:
#         if word in counts:
#             counts[word] += 1
#         else:
#             counts[word] = 1
#     return counts

# @app.route("/api/test/")
# def test():
#     # return """<h3>route works</h3>"""
#     # set up database connection
#     client = pymongo.MongoClient("mongodb+srv://AtlasTwitter:1FineTwitterApp!@twittercluster.ycq9k.mongodb.net/")
#     mongo_db = client["Tweets_DB"]
#     mongo_collection = mongo_db["Combined_Tweets"]
#     # query db
#     testoutput =  mongo_collection.find({},{ "_id": 1, "Hashtags(#)": 1, "Identity": "Akshay Kumar"}).limit(10)
#     # turn into JSON
#     testoutput_listcursor = list(testoutput)
#     json_data = dumps(testoutput_listcursor, indent=2)
#     return json_data

# @app.route("/api/dynamictest/", methods=['GET'])
# def dynamictest():
#     # return """<h3>route works</h3>"""
#     # get twitter identity from API URL query / call 
#     QueryIdentity = request.args.get("identity", None)
#     print(f"got name {QueryIdentity}")
#     if QueryIdentity.startswith('"') and QueryIdentity.endswith('"'):
#         QueryIdentity = QueryIdentity[1:-1]
#         print(f"revised name {QueryIdentity}")
#     # set up database connection
#     client = pymongo.MongoClient("mongodb+srv://AtlasTwitter:1FineTwitterApp!@twittercluster.ycq9k.mongodb.net/")
#     mongo_db = client["Tweets_DB"]
#     mongo_collection = mongo_db["Combined_Tweets"]
#     # query db
#     testoutput =  mongo_collection.find( { "Identity": QueryIdentity },{ "_id": 0, "Hashtags(#)": 1} ).limit(20)
#     # turn into JSON
#     testoutput_listcursor = list(testoutput)
#     print(testoutput_listcursor)
#     json_data = dumps(testoutput_listcursor, indent=2)
#     return json_data
#     # stringreturn = "<h3>Name Is " + QueryIdentity + "</h3>"
#     # return stringreturn


# @app.route("/api/wordcloud/", methods=['GET'])
# def wordcloud():
#     # get twitter identity from API URL query / call 
#     QueryIdentity = request.args.get("identity", None)
#     print(f"got name {QueryIdentity}")
#     if QueryIdentity.startswith('"') and QueryIdentity.endswith('"'):
#         QueryIdentity = QueryIdentity[1:-1]
#         print(f"revised name {QueryIdentity}")
#     # set up database connection
#     client = pymongo.MongoClient("mongodb+srv://AtlasTwitter:1FineTwitterApp!@twittercluster.ycq9k.mongodb.net/")
#     mongo_db = client["Tweets_DB"]
#     mongo_collection = mongo_db["Combined_Tweets"]
#     # query db
#     output =  mongo_collection.find( { "Identity": QueryIdentity, "Hashtags(#)": {"$ne" : '[]'} },{ "_id": 0, "Hashtags(#)": 1} )
#     # convert to dataframe
#     output_df = pd.DataFrame(list(output))
#     HashTagArray = [eval(x) for x in output_df["Hashtags(#)"]]
#     flattened_Hashtag_list = []
#     for l1 in HashTagArray:
#         for l2 in l1:
#             flattened_Hashtag_list.append(l2)
#     hashtag_dict = word_count(flattened_Hashtag_list)
#     dict_df = pd.DataFrame()
#     dict_df = pd.DataFrame(list(hashtag_dict.items()),columns = ['text','size']) 
#     dict_df.sort_values(['size'], ascending=False, inplace=True)
#     dict_df = dict_df.head(250)
#     return Response(dict_df.to_json(orient="records"), mimetype='application/json')

# @app.route("/api/identitylist/")
# def list_identities():
#     Identity_List = ['Akshay Kumar', 'Amitabh Bachchan', 'Ariana Grande', 'Barack Obama', 'BBC', 'Bill Gates', 'Britney Spears', 'Bruno Mars', 'CNN Breaking', 'CNN', 'Cristiano Ronaldo', 'Donald Trump', 'Drake', 'ESPN', 'FC Barcelona', 'Harry Styles', 'Instagram', 'Jimmy Fallon', 'J Lo', 'Justin Bieber', 'Justin Timberlake', 'Katy Perry', 'Kevin Hart', 'Kim Kardashian', 'Lady Gaga', 'Le Bron James', 'Liam Payne', 'Lil Wayne', 'Louis Tomlinson', 'Miley Cyrus', 'Narendra Modi', 'NASA', 'Neymar Jr', 'Niall Horan', 'NY Times', 'Oprah', 'Pink', 'Real Madrid', 'Rihanna', 'Salman Khan', 'Selena Gomez', 'Shah Rukh Khan', 'Shakira', 'Sports Center', 'Taylor Swift', 'The Ellen Show', 'Twitter', 'Virat Kohli', 'Wiz Khalifa', 'Youtube']
#     Identities_df = pd.DataFrame(Identity_List,columns=['Identities'])
#     return Response(Identities_df.to_json(orient="records"), mimetype='application/json')


# @app.route('/getmsg/', methods=['GET'])
# def respond():
#     # Retrieve the name from url parameter
#     name = request.args.get("name", None)
#     # For debugging
#     print(f"got name {name}")
#     response = {}
#     # Check if user sent a name at all
#     if not name:
#         response["ERROR"] = "no name found, please send a name."
#     # Check if the user entered a number not a name
#     elif str(name).isdigit():
#         response["ERROR"] = "name can't be numeric."
#     # Now the user entered a valid name
#     else:
#         response["MESSAGE"] = f"Welcome {name} to our awesome platform!!"
#     # Return the response in json format
#     return jsonify(response)



# @app.route("/api/average/", methods=['GET'])
# def average():
#     # set
#     QueryName = request.args.get("name",None)
#     print(f"got name {QueryName}")
#     if QueryName.startswith('""') and QueryName.endswith('""'):
#         QueryName = QueryName[2:-2]
#         print(f"revised name {QueryName}")
#     # set updatabase connection
#     client = pymongo.MongoClient("mongodb+srv://AtlasTwitter:1FineTwitterApp!@twittercluster.ycq9k.mongodb.net/")
#     mongo_db = client["Tweets_DB"]
#     mongo_collection = mongo_db["Combined_Tweets"]
#     testoutput = mongo_collection.aggregate([{ '$match': { 'Identity': QueryName } },{ '$group': { '_id': 1, 'average': { '$avg': "$Likes" } } }])
#     # turn into JSON
#     print(f"output {testoutput}")
#     testoutput_listcursor = list(testoutput)
#     print(testoutput_listcursor)
#     json_data = dumps(testoutput_listcursor, indent=2)
#     return json_data



# @app.route("/api/average/daily/", methods=['GET'])
# def averageDaily():
#     QueryName = request.args.get("name",None)
#     print(f"got name {QueryName}")
#     if QueryName.startswith('""') and QueryName.endswith('""'):
#         QueryName = QueryName[2:-2]
#         print(f"revised name {QueryName}")
#     client = pymongo.MongoClient("mongodb+srv://AtlasTwitter:1FineTwitterApp!@twittercluster.ycq9k.mongodb.net/")
#     mongo_db = client["Tweets_DB"]
#     mongo_collection = mongo_db["Combined_Tweets"]
#     testoutput = mongo_collection.aggregate([{ '$match': { 'Identity': QueryName } },{ '$group': { '_id': 1, 'average': { '$avg': "$Likes" } } }])
#     print(f"output {testoutput}")
#     testoutput_listcursor = list(testoutput)
#     print(testoutput_listcursor)
#     json_data = dumps(testoutput_listcursor, indent=2)
#     return json_data


# @app.route("/api/dashboard/", methods=['GET'])
# def dashboard():
#     # set up pymongo connection
#     client = pymongo.MongoClient("mongodb+srv://AtlasTwitter:1FineTwitterApp!@twittercluster.ycq9k.mongodb.net/")
#     mongo_db = client["Tweets_DB"]
#     mongo_collection = mongo_db["Combined_Tweets"]

#     # set QueryIdentity from API GET, clean out commas
#     QueryIdentity = request.args.get("name",None)
#     print(f"got name {QueryIdentity}")
#     if QueryIdentity.startswith('"') and QueryIdentity.endswith('"'):
#         QueryIdentity = QueryIdentity[1:-1]
#         print(f"revised name {QueryIdentity}")
    
#     # Query Mongo, turn into Dataframe 
#     identity_df = pd.DataFrame(list(mongo_collection.find({"Identity": QueryIdentity})))

#     # Read In Date / Time 
#     identity_df['Time'] = pd.to_datetime(identity_df["Time"],format='%H:%M:%S')
#     identity_df["Date"] = pd.to_datetime(identity_df["Date"],format="%Y-%m-%d")

#     # Group DF by Month, get stats 
#     identity_groupby_month_df = identity_df.groupby(pd.Grouper(key='Date', freq='M'))
#     AvgTweetsPerMonth = round(identity_groupby_month_df['Tweet Id'].count().mean())
#     AvgLikesPerMonth = round(identity_groupby_month_df['Likes'].sum().mean())
#     AvgReTweetsPerMonth = round(identity_groupby_month_df['Retweets'].sum().mean())
#     AvgAtMentionsPerMonth = round(identity_groupby_month_df['Total @'].sum().mean())
#     AvgHashtagsPerMonth = round(identity_groupby_month_df['Total #'].sum().mean())

#     # Group DF by Day, get stats 
#     identity_groupby_day_df = identity_df.groupby(pd.Grouper(key='Date', freq='D'))
#     AvgTweetsPerDay = round(identity_groupby_day_df['Tweet Id'].count().mean())
#     AvgLikesPerDay = round(identity_groupby_day_df['Likes'].sum().mean())
#     AvgReTweetsPerDay = round(identity_groupby_day_df['Retweets'].sum().mean())
#     AvgAtMentionsPerDay = round(identity_groupby_day_df['Total @'].sum().mean())
#     AvgHashtagsPerDay = round(identity_groupby_day_df['Total #'].sum().mean())

#     # Get Totals Stats 
#     TotalTweets = identity_df['Tweet Id'].count()
#     TotalLikes = identity_df['Likes'].sum()
#     TotalReTweets = identity_df['Retweets'].sum()
#     TotalAtMentions = identity_df['Total @'].sum()
#     TotalHashtags = identity_df['Total #'].sum()

#     # Create Scatterplot DF & JSON it
#     scatter_df = identity_df[['Likes','Retweets']]
#     # scatter_json = scatter_df.to_json(orient="records")

#     # Combine Stats into a Dictionary
#     Tweet_Data_Stats = {
#         "TotalTweets": int(TotalTweets),
#         "TotalLikes": int(TotalLikes),
#         "TotalReTweets": int(TotalReTweets),
#         "TotalAtMentions": int(TotalAtMentions),
#         "TotalHashtags": int(TotalHashtags),
#         "AvgTweetsPerDay": AvgTweetsPerDay,
#         "AvgLikesPerDay": AvgLikesPerDay,
#         "AvgReTweetsPerDay": AvgReTweetsPerDay,
#         "AvgAtMentionsPerDay": AvgAtMentionsPerDay,
#         "AvgHashtagsPerDay": AvgHashtagsPerDay,
#         "AvgTweetsPerMonth": AvgTweetsPerMonth,
#         "AvgLikesPerMonth": AvgLikesPerMonth,
#         "AvgReTweetsPerMonth": AvgReTweetsPerMonth,
#         "AvgAtMentionsPerMonth": AvgAtMentionsPerMonth,
#         "AvgHashtagsPerMonth": AvgHashtagsPerMonth
#     }

#     # Copy Dataframe into Global for other function
#     global_df = identity_df.copy()

    
#     # Return 
#     tweet_json_data = dumps(Tweet_Data_Stats, indent=2)
#     return tweet_json_data


# @app.route("/api/dashboard/scatter/", methods=['GET'])
# def scatterResults():
#     client = pymongo.MongoClient("mongodb+srv://AtlasTwitter:1FineTwitterApp!@twittercluster.ycq9k.mongodb.net/")
#     mongo_db = client["Tweets_DB"]
#     mongo_collection = mongo_db["Combined_Tweets"]
    
#     # set QueryIdentity from API GET, clean out commas
#     QueryIdentity = request.args.get("name",None)
#     print(f"got name {QueryIdentity}")
#     if QueryIdentity.startswith('"') and QueryIdentity.endswith('"'):
#         QueryIdentity = QueryIdentity[1:-1]
#         print(f"revised name {QueryIdentity}")
    
#     scatter_df = pd.DataFrame(list(mongo_collection.find({"Identity": QueryIdentity} ,{ "_id": 0, "Likes": 1, "Retweets" : 1} )))
#     scatter_json = scatter_df.to_json(orient="records")
#     # scatter_json = dumps(scatter_df)

#     return scatter_json





# @app.route('/api/ARC_Diagram/')
# def arcdiagram():
#     client = pymongo.MongoClient("mongodb+srv://AtlasTwitter:1FineTwitterApp!@twittercluster.ycq9k.mongodb.net/")
#     mongo_db = client["Tweets_DB"]
#     mongo_collection = mongo_db["Arc_Diagram"]
#     ARC_output =  mongo_collection.find_one( {} )
#     for entry in ARC_output:
#         print(entry)
#     arc_json = dumps(ARC_output, indent=2)
#     return arc_json

# @app.route('/ARC_Diagram/')
# def arcindex():
#     return render_template("arc_index.html")

# @app.route('/wordcloudpage/')
# def wordcloudpage():
#     return render_template("wordcloud.html")

# A welcome message to test our server

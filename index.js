


var Twit = require('twit');

var fs = require('fs');


var exec = require('child_process').exec;

console.log('the bot is starting');


var T = new Twit({
  consumer_key:         'aLEBDpbeVdbkZt80XcnGE5diM',
  consumer_secret:      '6gI8OHq8GTYdR3lEwSxotuocDSSDp5K3KccNydVc7tKNIONBel',
  access_token:         '944542577293971456-HsAmlhqWb3YNJQu1dcUEE3OxTnJub5j',
  access_token_secret:  'zNdUgP1Unbj4X7xtolXQvU6RVZrEYWehygHnmOvQnapFX',
});

//
// var stream = T.stream('user'); //setting up a user stream
//
// stream.on('tweet', tweetEvent); //anytime someone follows me
//
// function tweetEvent(event) {
//    var fs = require('fs');
//    var json = JSON.stringify(event, null, 2);
//    fs.writeFile("tweet.json", json);
//
//    var replyTo = event.in_reply_to_screen_name;
//    var text = event.text;
//    var from = event.user.screen_name;
//
//    if(replyTo == 'OBugault') {
//      var newTweet = 'Hello @ ' + from + ' thank you for tweeting me';
//      tweetIt(newTweet);
//
//    }
// }



  tweetIt();

  setInterval(tweetIt, 1000 * 60 * 60 * 24);

  function tweetIt(err, data, response){

    var AlphaVantageAPI = require('alpha-vantage-cli').AlphaVantageAPI;

    var yourApiKey = 'KV4H7VKIW1M4VTO0';
    var alphaVantageAPI = new AlphaVantageAPI(yourApiKey, 'compact', true);

    let dailyData =

    alphaVantageAPI.getDailyData('MSFT')
        .then(dailyData => {
            dailyDataLow = JSON.stringify(dailyData[0]['Low'])
            dailyDataHigh = JSON.stringify(dailyData[0]['High'])
            dailyDataOpen = JSON.stringify(dailyData[0]['Open'])
            console.log(dailyData);
            var tweet = {
              status: 'Yesterday, Microsoft opened with a ' + dailyDataOpen  + ' value on the stock market. It spiked at ' + dailyDataHigh + ' whereas its lowest value was ' +  dailyDataLow + '.'
            }

            T.post('statuses/update', tweet, tweeted);


             function tweeted(err, data, response) {
               if(err) {
                 console.log('Something went wrong');
                 console.log(err);
               } else {
                 console.log('it worked!');

                 }
               }
        })
        .catch(err => {
            console.error(err);
        });


};






//
// var stream = T.stream('user'); //setting up a user stream
//
// stream.on('tweet', tweetEvent); //anytime someone follows me
//
// function tweetEvent(event) {
//   console.log('yeeaah');
//   var name = event.source.name;
//   var screenName = event.source.screen_name;
//   tweetIt('Welcome @' + screenName + '. Why are you here?');
// }

// var params = {
//   encoding: 'base64'
// }
// var b64content = fs.readFileSync(filename, params);

// T.post('media/upload', {media_data: b64content }, uploaded);

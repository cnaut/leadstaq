var Twit = require('twit');

var Twitter = new Twit({
  consumer_key: process.env.TWITTER_API_KEY,
  consumer_secret: process.env.TWITTER_API_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});


/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index');
};

exports.twittersearch = function(req, res) {
  Twitter.get('search/tweets', { q: req.params.query, count: 100 }, function(err, reply) {
    res.send(reply);
  });
}

exports.twittertweet = function(req, res) {
  var handles = JSON.parse(req.body.handles);
  for(var i = 0; i < handles.length; i++) {
    Twitter.post( 'statuses/update', { status: "@" + handles[i] + " I'm testing out a new startup idea and would love to get your feedback. Quick survey here: http://bit.ly/1mJsX0X"  }, function(err, reply) {
      if(err) {
        console.log(err);
        res.send(err);
      }
      else {
        res.send(reply);
      }
    });
  }
}

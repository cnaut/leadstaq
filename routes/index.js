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

exports.twitterdm = function(req, res) {
  Twitter.post( 'direct_messages/new', { screen_name: "richardjlo", text: "hihi" }, function(err, reply) {
    console.log(err);
    console.log(reply);
    res.send(reply);
  });
}

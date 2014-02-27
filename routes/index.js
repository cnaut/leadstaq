var Twit = require('twit');

console.log(process.env.TWITTER_API_KEY)

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
  Twitter.get('search/tweets', { q: "startups", count: 100 }, function(err, reply) {
  res.render('index', { tweets: reply });
  });
};

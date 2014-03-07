var Twit = require('twit');
var request = require('request');
var qs = require('querystring');

var Twitter = new Twit({
  consumer_key: process.env.TWITTER_API_KEY,
  consumer_secret: process.env.TWITTER_API_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

exports.index = function(req, res){
  request.post({url:'https://api.twitter.com/oauth/request_token', oauth: {consumer_key: process.env.TWITTER_API_KEY, consumer_secret: process.env.TWITTER_API_SECRET, callback: process.env.TWITTER_CALLBACK }}, function(err, response, body) {
    var token = qs.parse(body);
    res.render('index', {token: token.oauth_token});
  });
};


exports.search = function(req, res){
  var oauthToken  = req.param("oauth_token");
  var oauthVerifier = req.param("oauth_verifier");
  request.post({url:'https://api.twitter.com/oauth/access_token', oauth: {consumer_key: process.env.TWITTER_API_KEY, consumer_secret: process.env.TWITTER_API_SECRET, token: oauthToken, verifier: oauthVerifier  }}, function(err, response, body) {
    var token = qs.parse(body);
    console.log(token)
    Twitter.setAuth({access_token: token.oauth_token, access_token_secret: token.oauth_token_secret});
    res.render('search');
  });
};


exports.twittersearch = function(req, res) {
  Twitter.get('search/tweets', { q: req.params.query, count: 100 }, function(err, reply) {
    res.send(reply);
  });
}

exports.twittertweet = function(req, res) {
  var handles = JSON.parse(req.body.handles);
  for(var i = 0; i < handles.length; i++) {
    Twitter.post( 'statuses/update', { status: "@" + handles[i] + " " + req.body.message  }, function(err, reply) {
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

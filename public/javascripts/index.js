$("#search-btn").click(function() {
  console.log($("#search-box").val());
  $.ajax({
    url: "/twittersearch/" + $("#search-box").val(),
    success: function(results) {
      document.getElementById("tweets").innerHTML = new EJS({ url: 'ejs/tweets.ejs' }).render({ tweets: results.statuses });
    }
  });
});

$(function() {
  $("#search-btn").click(function() {
    $.ajax({
      url: "/twittersearch/" + $("#search-box").val(),
      success: function(results) {
        document.getElementById("tweets").innerHTML = new EJS({ url: 'ejs/tweets.ejs' }).render({ tweets: results.statuses });
      }
    });
  });

  $("#tweets").on('click', ".add-btn", function() {
    var tweetDiv = $(this).parent().parent().parent();
    tweetDiv.hide();
    var name = tweetDiv.find(".username").html();
    var handle = tweetDiv.find(".username").attr("href");
    var description = tweetDiv.find(".description").html();
    $("#added").append("<tr><td>" + name + "</td><td>" + handle + "</td><td>" + description + "</td></tr>");
  });

  $("#send-btn").click(function() {
    $.ajax({
      url: "/twitterdm",
    });
  });
});

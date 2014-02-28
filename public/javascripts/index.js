$(function() {
  var handles = [];

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
    var name = tweetDiv.find(".username").html();
    var handle = tweetDiv.find(".username").attr("handle");
    var link = tweetDiv.find(".username").attr("href");
    var description = tweetDiv.find(".description").html();
    
    tweetDiv.hide();
    handles.push(handle);
    $("#added").append("<tr><td>" + name + "</td><td>" + link + "</td><td>" + description + "</td></tr>");
  });

  $("#send-btn").click(function() {
    $.ajax({
      type: "POST",
      url: "/twittertweet",
      dataType: "json",
      data: { handles: JSON.stringify(handles) },
      success: function(response) {
        console.log(response);
      }
    });
  });
});

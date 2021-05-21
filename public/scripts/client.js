let initialTweets = [
  {
    "user": {
      "name": "not newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@bingobongo"
    },
    "content": {
      "text": "i hate gr agrvit y"
    },
    "created_at": 1621205361026
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1621291761026
  }
];

const createTweetElement = function(tweetData) {
  const tweetUser = tweetData["user"];
  const name = tweetUser["name"];
  const avatar = tweetUser["avatars"];
  const handle = tweetUser["handle"];
  const content = tweetData["content"]["text"];
  const date = timeago.format(tweetData["created_at"]);

  let tweetHTML =
  `<article class="tweet">
    <header class="tweet-header">
      <div class="icon-name">
        <img src=${avatar} class="avatar">
        <p class="tweet-name">${name}</p>
      </div>
      </div>
      <p class="tweet-user-tag">${handle}</p>
    </header>
    <div class="tweet-content">
      <p class="tweet-text">
        ${content}
      </p>
    </div>
    <footer class="tweet-footer">
      <p class="tweet-date">
        ${timeago.format(date)}
      </p>
      <div class="icons">
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </div>
    </footer>
  </article>`;
  return tweetHTML;
};

const renderTweets = function(tweetData) {
  for (let tweet of tweetData) {
    $("#tweets-container").prepend(createTweetElement(tweet));
  }
};

const loadTweets = function() {
  $.ajax("/tweets", {method: "GET"})
    .then(function(tweets) {
      renderTweets(tweets);
    });
};

$(document).ready(function() {
  $(".error").hide();
  $("#tweetform").submit(function(event) {
    $(".error").slideUp();
    event.preventDefault();
    let charLeft = $(this).find("textarea").val().length;
    if (charLeft > 140) {
      $(".errorMsg").text("please keep it below 140 chars! tytyty");
      $(".error").slideDown();
    } else if (charLeft <= 0) {
      $(".errorMsg").text("please enter some text first!");
      $(".error").slideDown();
    } else {
      $.post("/tweets", $(this).serialize())
        .then(function() {
          return $.ajax("/tweets", {method: "GET"});
        })
        .then(function(tweets) {
          console.log(tweets[tweets.length - 1]);
          return createTweetElement(tweets[tweets.length - 1]);
        })
        .then(function(tweet) {
          $("#tweets-container").prepend(tweet);
        });
    }
  });
  loadTweets();
});

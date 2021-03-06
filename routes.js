var JSX = require('node-jsx').install(),
  React = require('react'),
  // loadMore = React.createFactory(require('./components/loadMore.react')),
  TweetsApp = React.createFactory(require('./components/TweetsApp.react')),
  Tweet = require('./models/Tweet');

module.exports = {

  index: function(req, res) {
    // Call static model method to get tweets in the db
    Tweet.getTweets(0,0, function(tweets, pages) {

      // Render React to a string, passing in our fetched tweets
      var markup = React.renderToString(
        TweetsApp({
          tweets: tweets
        })
      );
// console.log("tweets-------------------------------------------------",tweets);
      // Render our 'home' template
      res.render('home', {
        markup: markup, // Pass rendered react markup
        state: JSON.stringify(tweets) // Pass current state to client side
      });

    });
  },

  page: function(req, res) {
    // Fetch tweets by page via param
    Tweet.getTweets(req.params.page, req.params.skip, function(tweets) {
      console.log("page-----------------------------------",tweets);

      // Render as JSON
      res.send(tweets);

    });
  },

  loadMore: function(req, res) {
    // Fetch tweets by page via param
    Tweet.getTweets(req.params.page, req.params.skip, function(tweets) {
      console.log("page-----------------------------------",tweets);

      // Render as JSON
      res.send(tweets);

    });
  }
}

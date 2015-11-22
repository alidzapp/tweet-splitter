'use strict';

var TEXTAREA = document.getElementById('tweet');
var OUTPUT = document.getElementById('output');

var generateTweets = function generateTweets() {
  var inputText = TEXTAREA.value;
  var numberOfTweetsNeeded = Math.ceil(inputText.length / 140);

  OUTPUT.innerHTML = '';

  if (numberOfTweetsNeeded > 1) {
    (function () {
      var charsToAllow = numberOfTweetsNeeded > 9 ? 129 : 131;
      var chunks = inputText.match(new RegExp('[\\s\\S]{1,' + charsToAllow + '}', 'g'));

      chunks.forEach(function (value, index) {
        var i = index + 1;
        var total = chunks.length;
        var ellipses = i < total ? '...' : '';

        buildTweetText('' + value + ellipses + ' (' + i + '/' + total + ')');
      });
    })();
  } else {
    buildTweetText(inputText);
  }
};

var buildTweetText = function buildTweetText(text) {
  var tweetText = document.createElement('p');
  tweetText.innerHTML = text;
  OUTPUT.appendChild(tweetText);
};

document.getElementById('submit').addEventListener('click', generateTweets);

document.getElementById('reset').addEventListener('click', function () {
  TEXTAREA.value = '';
  OUTPUT.innerHTML = '';
});
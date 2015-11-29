'use strict';

var TEXTAREA = document.querySelector('.Tweet');
var OUTPUT = document.querySelector('.Output');
var COUNTER = document.querySelector('.Counter');
var OPTIONS_OPEN = document.getElementById('Options');
var OPTIONS_CLOSE = document.getElementById('Options-close');
var OPTIONS = document.querySelector('.Options');
var ELLIPSES = document.getElementById('Ellipses');
var COUNT_WRAP = document.getElementById('Count-wrap');
var COUNT_SEPARATOR = document.getElementById('Count-separator');
var SUBMIT = document.getElementById('Submit');
var RESET = document.getElementById('Reset');
var LOGIN = document.getElementById('Login');
var LOGIN_AREA = document.querySelector('.LoginArea');
var POST = document.getElementById('PostTweets');

var generateTweets = function generateTweets() {
  var inputText = TEXTAREA.value;
  var numberOfTweetsNeeded = Math.ceil(inputText.length / 140);

  OUTPUT.innerHTML = '';

  if (numberOfTweetsNeeded > 1) {
    (function () {
      var countWrap = COUNT_WRAP.options[COUNT_WRAP.selectedIndex].value;
      var charsToAllow = ELLIPSES.checked ? 136 : 139; // ... + space = 140
      charsToAllow = countWrap === 'none' ? charsToAllow - 3 : charsToAllow - 5;

      var chunks = inputText.match(new RegExp('[\\s\\S]{1,' + charsToAllow + '}', 'g'));

      chunks.forEach(function (value, index) {
        var i = index + 1;
        var total = chunks.length;

        var ellipses = i < total && ELLIPSES.checked ? '...' : '';
        var countSeparator = COUNT_SEPARATOR.options[COUNT_SEPARATOR.selectedIndex].value === 'slash' ? '/' : '|';
        var wrapChars = countWrap;
        var wrapOpen = undefined,
            wrapClose = undefined;

        if (wrapChars === 'parentheses') {
          wrapOpen = '(';
          wrapClose = ')';
        } else if (wrapChars === 'brackets') {
          wrapOpen = '[';
          wrapClose = ']';
        } else {
          wrapOpen = '';
          wrapClose = '';
        }

        buildTweetText('' + value + ellipses + ' ' + wrapOpen + i + countSeparator + total + wrapClose);
      });
    })();
  } else {
    buildTweetText(inputText);
  }
};

var buildTweetText = function buildTweetText(text) {
  var tweetText = document.createElement('p');
  tweetText.textContent = text;
  OUTPUT.appendChild(tweetText);
};

LOGIN.addEventListener('click', function () {
  var twitter = hello('twitter');

  hello.init({
    'twitter': '1gckkpFfOPYAa1cFAb25fAw6N'
  }, {
    redirect_uri: 'redirect.html',
    oauth_proxy: 'https://auth-server.herokuapp.com/proxy'
  });

  twitter.login().then(function () {
    return twitter.api('me');
  }).then(function (p) {
    LOGIN_AREA.innerHTML = '<img src="' + p.thumbnail + '" width="28" height="28"><p>' + p.screen_name + '</p>';
    POST.classList.add('is-visible');
  });
});

POST.addEventListener('click', function () {
  var tweets = document.querySelectorAll(".Output p");

  [].forEach.call(tweets, function (tweet) {
    hello('twitter').api('statuses/update', 'POST', {
      status: tweet
    });
  });
});

SUBMIT.addEventListener('click', generateTweets);

RESET.addEventListener('click', function () {
  TEXTAREA.value = '';
  OUTPUT.innerHTML = '';
  COUNTER.textContent = '0';
  POST.classList.remove('is-visible');
});

[OPTIONS_OPEN, OPTIONS_CLOSE].forEach(function (element) {
  element.addEventListener('click', function (e) {
    e.preventDefault();
    OPTIONS.classList.toggle('is-active');
  });
});

TEXTAREA.addEventListener('input', function (e) {
  COUNTER.textContent = e.target.value.length;
});

[ELLIPSES, COUNT_WRAP, COUNT_SEPARATOR].forEach(function (element) {
  element.addEventListener('change', generateTweets);
});

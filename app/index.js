'use strict';

var TEXTAREA = document.querySelector('.Tweet');
var OUTPUT = document.querySelector('.Output');
var COUNTER = document.querySelector('.Counter');
var OPTIONS = document.querySelector('.Options');
var ELLIPSES = document.getElementById('Ellipses');
var COUNT_WRAP = document.getElementById('Count-wrap');
var COUNT_SEPARATOR = document.getElementById('Count-separator');
var SUBMIT = document.getElementById('Submit');

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

SUBMIT.addEventListener('click', generateTweets);

[ELLIPSES, COUNT_WRAP, COUNT_SEPARATOR].forEach(function (element) {
  element.addEventListener('change', generateTweets);
});

document.getElementById('Reset').addEventListener('click', function () {
  TEXTAREA.value = '';
  OUTPUT.innerHTML = '';
  COUNTER.textContent = '0';
});

document.querySelector('.Change-options').addEventListener('click', function (e) {
  e.preventDefault();
  e.target.classList.toggle('is-active');
  OPTIONS.classList.toggle('is-active');
});

TEXTAREA.addEventListener('input', function (e) {
  COUNTER.textContent = e.target.value.length;
});
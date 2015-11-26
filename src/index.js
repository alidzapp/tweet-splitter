const TEXTAREA = document.querySelector('.Tweet');
const OUTPUT = document.querySelector('.Output');
const COUNTER = document.querySelector('.Counter');
const CHANGE_OPTIONS = document.querySelector('.Change-options');
const OPTIONS = document.querySelector('.Options');
const ELLIPSES = document.getElementById('Ellipses');
const COUNT_WRAP = document.getElementById('Count-wrap');
const COUNT_SEPARATOR = document.getElementById('Count-separator');
const SUBMIT = document.getElementById('Submit');
const RESET = document.getElementById('Reset');

var generateTweets = () => {
  let inputText = TEXTAREA.value;
  let numberOfTweetsNeeded = Math.ceil(inputText.length / 140);

  OUTPUT.innerHTML = '';

  if (numberOfTweetsNeeded > 1) {
    let countWrap = COUNT_WRAP.options[COUNT_WRAP.selectedIndex].value;
    let charsToAllow = ELLIPSES.checked ? 136 : 139; // ... + space = 140
    charsToAllow = countWrap === 'none' ? charsToAllow - 3 : charsToAllow - 5;

    let chunks = inputText.match(new RegExp('[\\s\\S]{1,' + charsToAllow + '}', 'g'));

    chunks.forEach(function(value, index) {
      let i = index + 1;
      let total = chunks.length;

      let ellipses = (i < total && ELLIPSES.checked) ? '...' : '';
      let countSeparator = COUNT_SEPARATOR.options[COUNT_SEPARATOR.selectedIndex].value === 'slash' ? '/' : '|';
      let wrapChars = countWrap;
      let wrapOpen, wrapClose;

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

      buildTweetText(`${value}${ellipses} ${wrapOpen}${i}${countSeparator}${total}${wrapClose}`);
    });
  } else {
    buildTweetText(inputText);
  }
};

var buildTweetText = (text) => {
  let tweetText = document.createElement('p');
  tweetText.textContent = text;
  OUTPUT.appendChild(tweetText);
};

SUBMIT.addEventListener('click', generateTweets);

[ELLIPSES, COUNT_WRAP, COUNT_SEPARATOR].forEach(element => {
  element.addEventListener('change', generateTweets);
});

RESET.addEventListener('click', () => {
  TEXTAREA.value = '';
  OUTPUT.innerHTML = '';
  COUNTER.textContent = '0';
});

CHANGE_OPTIONS.addEventListener('click', (e) => {
  e.preventDefault();
  e.target.classList.toggle('is-active');
  OPTIONS.classList.toggle('is-active');
});

TEXTAREA.addEventListener('input', function(e) {
  COUNTER.textContent = e.target.value.length;
});

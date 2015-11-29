const TEXTAREA = document.querySelector('.Tweet');
const OUTPUT = document.querySelector('.Output');
const COUNTER = document.querySelector('.Counter');
const OPTIONS_OPEN = document.getElementById('Options');
const OPTIONS_CLOSE = document.getElementById('Options-close');
const OPTIONS = document.querySelector('.Options');
const ELLIPSES = document.getElementById('Ellipses');
const COUNT_WRAP = document.getElementById('Count-wrap');
const COUNT_SEPARATOR = document.getElementById('Count-separator');
const SUBMIT = document.getElementById('Submit');
const RESET = document.getElementById('Reset');
const LOGIN = document.getElementById('Login');
const LOGIN_AREA = document.querySelector('.LoginArea');
const POST = document.getElementById('PostTweets');

let generateTweets = () => {
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

let buildTweetText = (text) => {
  let tweetText = document.createElement('p');
  tweetText.textContent = text;
  OUTPUT.appendChild(tweetText);
};

LOGIN.addEventListener('click', () => {
  let twitter = hello('twitter');

  hello.init({
    'twitter': '1gckkpFfOPYAa1cFAb25fAw6N'
  },
  {
    redirect_uri: 'redirect.html',
    oauth_proxy: 'https://auth-server.herokuapp.com/proxy'
  });

  twitter.login().then(() => {
    return twitter.api('me');
  })
  .then((p) => {
    LOGIN_AREA.innerHTML = `<img src="${p.thumbnail}" width="28" height="28"><p>${p.screen_name}</p>`;
    POST.classList.add('is-visible');
  });
});

POST.addEventListener('click', () => {
  let tweets = document.querySelectorAll(".Output p");

  [].forEach.call(tweets, (tweet) => {
    hello('twitter').api('statuses/update', 'POST', {
      status: tweet
    });
  });
});

SUBMIT.addEventListener('click', generateTweets);

RESET.addEventListener('click', () => {
  TEXTAREA.value = '';
  OUTPUT.innerHTML = '';
  COUNTER.textContent = '0';
  POST.classList.remove('is-visible');
});

[OPTIONS_OPEN, OPTIONS_CLOSE].forEach(element => {
  element.addEventListener('click', (e) => {
    e.preventDefault();
    OPTIONS.classList.toggle('is-active');
  });
});

TEXTAREA.addEventListener('input', (e) => {
  COUNTER.textContent = e.target.value.length;
});

[ELLIPSES, COUNT_WRAP, COUNT_SEPARATOR].forEach(element => {
  element.addEventListener('change', generateTweets);
});

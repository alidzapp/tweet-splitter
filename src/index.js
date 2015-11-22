const TEXTAREA = document.getElementById('tweet');
const OUTPUT = document.getElementById('output');

var generateTweets = () => {
  let inputText = TEXTAREA.value;
  let numberOfTweetsNeeded = Math.ceil(inputText.length / 140);

  OUTPUT.innerHTML = '';

  if (numberOfTweetsNeeded > 1) {
    let charsToAllow = numberOfTweetsNeeded > 9 ? 129 : 131;
    let chunks = inputText.match(new RegExp('[\\s\\S]{1,' + charsToAllow + '}', 'g'));

    chunks.forEach(function(value, index) {
      let i = index + 1;
      let total = chunks.length;
      let ellipses = i < total ? '...' : '';

      buildTweetText(`${value}${ellipses} (${i}/${total})`);
    });
  } else {
    buildTweetText(inputText);
  }
};

var buildTweetText = (text) => {
  let tweetText = document.createElement('p');
  tweetText.innerHTML = text;
  OUTPUT.appendChild(tweetText);
};

document.getElementById('submit').addEventListener('click', generateTweets);

document.getElementById('reset').addEventListener('click', () => {
  TEXTAREA.value = '';
  OUTPUT.innerHTML = '';
});

# tweet-splitter
Split a long Tweet into 140 character chunks (with appended numbers).

### Known limitations:
- URLs will just be considered text, so they will not be shortened or split properly.
- Tweet character count will be off for splits 1-9 if there are over 10 splits. For instance, tweet "5/16" will have one less character than the maximum allowed.
- Tweet character count will be off if there are over 99 resulting splits. Write a blog post instead!
- Using "Post Tweets" button doesn't guarantee tweets will be published to Twitter in sequential order. Actively working to fix.

### Features to Add
- ~~Customize split counter, e.g. "[2|4]" instead of "(2/4)"~~ [ 436660b](https://github.com/damonbauer/tweet-splitter/commit/436660b29e58d8e54ed7638d1f3959b7af7f6b57)
- ~~Twitter integration in order to post without having to copy & paste~~ [965a30f](https://github.com/damonbauer/tweet-splitter/commit/965a30f16e424ba3974947cfd674cdef89eb2816)
- Parse URLs

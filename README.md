# tweet-splitter
Split a long Tweet into 140 character chunks (with appended numbers).

### Known limitations:
- URLs will just be considered text, so they will not be shortened or split properly.
- Tweet character count will be off for splits 1-9 if there are over 10 splits. For instance, tweet "5/16" will have one less character than the maximum allowed.
- Tweet character count will be off if there are over 99 resulting splits. Write a blog post instead!

### Features to Add
- Customize split counter, e.g. "[2 of 4]" instead of "(2/4)"
- Twitter integration in order to post without having to copy & paste
- Parse URLs

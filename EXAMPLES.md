# Template Examples

> Feel free to copy/paste these example into your templates as a starting point.


## _.include() mixin

```js
{%= _.include("LICENSE-MIT") %}


{%= _("**", "\n\n***\n").glob().replace(/\#/g, "####") %}
```

## AUTHORS file


```js
{%= author.name %} ({%= author.url %})
// => Jon schlinkert (http://github.com/jonschlinkert)

[{%= authors[0].name %}]({%= authors[0].url %})
// => [Jon schlinkert](http://github.com/jonschlinkert)
```


## Time and date

```js
{%= grunt.template.today() %}
// => Tue Sep 17 2013 18:38:42
//
{%= grunt.template.today("yyyy") %}
// => 2013

{%= grunt.template.today("yyyy-mm-dd") %}
// => 2013-09-17
```


## Banner

```js
/*!
 * {%= name %} v{%= version %},  {%= grunt.template.today("yyyy-mm-dd") %}
 * {%= website %}
 * Copyright (c) {%= grunt.template.today("yyyy") %} {%= author %}, contributors.
 * Licensed under the {%= license %}.
 */
```


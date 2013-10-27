---
username: jonschlinkert
---
# {{{%= shortname %}}} [![NPM version](https://badge.fury.io/js/{%= name %}.png)](http://badge.fury.io/js/{%= name %}) {% if (travis) { %} [![Build Status]({%= travis %}.png)]({%= travis %}){% } %}

> {%= description %}

This helper depends on and extends [js-beautify](https://github.com/einars/js-beautify). Please visit and star that project to show your support.

[Also see examples →](./EXAMPLES.md)

## Quickstart
{%= _.doc("quickstart.md") %}

## Options
{%= _.doc("options.md") %}

## Usage Examples
{%= _.doc("examples.md") %}

## Contributing
Please see the [Contributing to Assemble](http://assemble.io/contributing) guide for information on contributing to this project.

## Author
+ [github.com/{%= username %}](https://github.com/{%= username %})
+ [twitter.com/{%= username %}](http://twitter.com/{%= username %})

## Related Projects and Links
+ [handlebars-helpers](https://github.com/assemble/handlebars-helpers)
+ [helpers](https://github.com/helpers/): some great handlebars helpers that we decided not to include in the [handlebars-helpers](https://github.com/assemble/handlebars-helpers) project, most often this decision is due to either the size of the code footprint, the helper wasn't generic enough, or there is a potential variable name conflict that we'd like to avoid..
+ [handlebars-helper-aggregate](https://github.com/assemble/handlebars-helper-aggregate): `{{aggregate}}` handlebars helper. inlines content from multiple files optionally using wildcard (globbing/minimatch) patterns. uses YAML front matter as context for each file. optionally pass in a sorting function.
+ [handlebars-helper-compose](https://github.com/assemble/handlebars-helper-compose): `{{compose}}` handlebars helper. Similar to `{{aggregate}}`, but this is a block expression helper that inlines content from multiple files differently, extracting the YAML front matter from each file to use as context. Optionally use wildcard (globbing/minimatch) patterns. Accepts compare function as 3rd parameter for sorting inlined files.
+ [handlebars-helper-moment](https://github.com/assemble/handlebars-helper-moment): `{{moment}}` handlebars helper. Combines the powers of Assemble, Handlebars.js and Moment.js into a great helper to master time.
+ [handlebars-helper-lorem](https://github.com/assemble/handlebars-helper-lorem): `{{lorem}}` handlebars helper, for generating lorem lorem placeholder text.
+ [handlebars-helper-prettify](https://github.com/assemble/handlebars-helper-prettify): `{{prettify}}` handlebars helper, for formatting ("beautifying") HTML, CSS and JavaScript.
+ [handlebars-helper-repeat](https://github.com/assemble/handlebars-helper-repeat): `{{repeat}}` handlebars helper, for duplicating a block of content n times.

## License
{%= copyright %}
{%= license %}

***

_This file was generated on {%= grunt.template.date("fullDate") %}._

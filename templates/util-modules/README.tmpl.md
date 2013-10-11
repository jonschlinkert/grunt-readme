---
author:
  name: Jon Schlinkert
  username: jonschlinkert
---
# {%= name %} [![NPM version](https://badge.fury.io/js/{%= name %}.png)](http://badge.fury.io/js/{%= name %}) {% if (travis) { %} [![Build Status]({%= travis %}.png)]({%= travis %}){% } %}

> {%= description %}

## Getting Started
{%= _.doc("quickstart.md") %}

## Options
{%= _.doc("options.md") %}

## Contributing
Please see the [Contributing to Assemble](http://assemble.io/contributing) guide for information on contributing to this project.

## Author

**{%= author.name %}**

+ [github.com/{%= author.username %}](https://github.com/{%= author.username %})
+ [twitter.com/{%= author.username %}](http://twitter.com/{%= author.username %})

## Related

+ [helpers](https://github.com/helpers): some great handlebars helpers that we decided not to include in the [handlebars-helpers](https://github.com/assemble/handlebars-helpers) project, most likely because the code footprint was too big or the helper wasn't generic enough.

## License
{%= copyright %}
{%= license %}

***

_This file was generated on {%= grunt.template.date("fullDate") %}._

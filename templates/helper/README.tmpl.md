---
username: jonschlinkert
---
# {{{%= shortname %}}} [![NPM version](https://badge.fury.io/js/{%= name %}.png)](http://badge.fury.io/js/{%= name %}) {% if (travis) { %} [![Build Status]({%= travis %}.png)]({%= travis %}){% } %}

> {%= description %}

## Quickstart
{%= _.doc("quickstart.md") %}

## Options
{%= _.doc("options.md") %}

## Usage Examples
{%= _.doc("examples.md") %}

## Contributing
Please see the [Contributing to Assemble](http://assemble.io/contributing) guide for information on contributing to this project.

## Related Projects and Links
{%= _.doc("repos.md") %}

## Author
+ [github.com/{%= username %}](https://github.com/{%= username %})
+ [twitter.com/{%= username %}](http://twitter.com/{%= username %})

## License
{%= copyright %}
{%= license %}

***

_This file was generated on {%= grunt.template.date("fullDate") %}._

# {%= name %} [![NPM version](https://badge.fury.io/js/{%= name %}.png)](http://badge.fury.io/js/{%= name %}) {% if (travis) { %} [![Build Status]({%= travis %}.png)]({%= travis %}){% } %}

> {%= description %}

{%= _.doc("heads-up.md") %}

## Getting Started
{%= _.doc("docs-getting-started.md") %}

## Options
{%= _.doc("docs-options.md") %}

## Usage Examples
{%= _.doc("docs-examples.md") %}

## Release History
 * {%= grunt.template.today('yyyy') %}   v0.1.0   First commit

## Author

+ [github/{%= author.name %}]({%= author.url %})
+ [twitter/{%= author.name %}](http://twitter.com/{%= author.name %})

## License
{%= _.include("docs-license.md") %}

***

_This file was generated on {%= grunt.template.today() %}._

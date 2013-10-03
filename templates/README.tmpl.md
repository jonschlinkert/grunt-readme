# {%= name %} [![NPM version](https://badge.fury.io/js/{%= name %}.png)](http://badge.fury.io/js/{%= name %}) {% if (travis) { %} [![Build Status]({%= travis %}.png)]({%= travis %}){% } %}

> {%= description %}

{%= _.doc("preface.md") %}

## Getting Started
{%= _.doc("docs-getting-started.md") %}

## Options
{%= _.doc("docs-options.md") %}

## Usage Examples
{%= _.doc("docs-examples.md") %}

## Contributing
Please see the [Contributing to {%= name %}]({%= _.homepage() %}/blob/master/CONTRIBUTING.md) guide for information on contributing to this project.

## Author

+ [github/{%= author.url %}]({%= author.url %})
+ [twitter/{%= author.url %}](http://twitter.com/{%= author.url %})

{% if (changelog) { %}
## Release History
{%= _.include("docs-changelog.md") %} {% } %}

## License
{%= _.include("docs-license.md") %}

***

_This file was generated on {%= grunt.template.date("fullDate") %}._

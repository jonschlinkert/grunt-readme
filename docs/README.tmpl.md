# {%= name %} [![NPM version](https://badge.fury.io/js/{%= name %}.png)](http://badge.fury.io/js/{%= name %}) {% if (travis) { %} [![Build Status]({%= travis %}.png)]({%= travis %}){% } %}

> {%= description %}

### For inspiration [also see EXAMPLES.md →](./EXAMPLES.md)

## Getting Started
{%= _.doc("docs-getting-started.md") %}

## Options
{%= _.doc("docs-options.md") %}

## mixins
{%= _.doc("docs-mixins.md") %}

## Usage Examples
{%= _.doc("docs-examples.md") %}

# Heads up!
To prevent Lo-Dash from attempting to evaluat templates that shouldn't be (as in code examples), just use square brackets instead of curly braces in any templates that have similar patterns to these: `[%= .. %]`, `[%- .. %]`, and `[% .. %]`. The square brackets will be replaced with curly braces in the rendered output.

## Contributing
Please see the [Contributing to {%= name %}]({%= _.homepage() %}/blob/master/CONTRIBUTING.md) guide for information on contributing to this project.

## Author

+ [github/{%= author.name %}]({%= author.url %})
+ [twitter/{%= author.name %}](http://twitter.com/{%= author.name %})

{% if (changelog) { %}
## Release History
{%= _.include("docs-changelog.md") %} {% } else { %}
 * {%= grunt.template.today('yyyy') %}   v0.1.0   First commit
{% } %}

## License
{%= _.include("docs-license.md") %}

***

_This file was generated on {%= grunt.template.today() %}._

[minimatch]: https://github.com/isaacs/minimatch

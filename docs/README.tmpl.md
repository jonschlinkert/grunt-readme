---
username: jonschlinkert
---
# {%= name %} [![NPM version](https://badge.fury.io/js/{%= name %}.png)](http://badge.fury.io/js/{%= name %}) {% if (travis) { %} [![Build Status]({%= travis %}.png)]({%= travis %}){% } %}

> {%= description %}

[Also see examples →](./EXAMPLES.md)

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
Please see the [Contributing to {%= name %}]({%= homepage %}/blob/master/CONTRIBUTING.md) guide for information on contributing to this project.

## Release History
{% if (changelog) {
  _.each(changelog, function(details, version) {
    var date = details.date;
    if (date instanceof Date) {
      date = grunt.template.date(new Date(date.getTime() + date.getTimezoneOffset() * 60000), 'yyyy-mm-dd');
    }
    print('\n * ' + [
      date,
      version,
      details.changes.join(' '),
    ].join('\u2003\u2003\u2003'));
  });
} else { %}
_(Nothing yet)_
{% } %}

## Author

+ [github.com/{%= username %}](https://github.com/{%= username %})
+ [twitter.com/{%= username %}](http://twitter.com/{%= username %})

## License
{%= copyright %}
{%= license %}

***

_This file was generated on {%= grunt.template.date("fullDate") %}._


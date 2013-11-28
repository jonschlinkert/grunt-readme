---
username: jonschlinkert
org: assemble
---
# {%= name %} {%= _.badge('fury') %} {%= _.badge('travis') %}

> {%= description %}

[Documentation →](./DOCS.md) | [Examples →](./DOCS.md#examples)

Please [report any bugs or feature requests](https://github.com/{%= org %}/{%= name %}/issues/new), thanks!

## Quickstart
{%= _.doc("docs-quickstart.md") %}

## Example "README" template
{%= _.doc("docs-example.md") %}

## Release History
{%= _.include("release-history.md") %}

## Related Projects
{%= _.include("related-repos.md") %}

## Contributing
{%= _.contrib("contributing.md") %}

## Authors
{%= _.contrib("authors.md") %}

## License
{%= copyright %}
{%= license %}

***

{%= _.include("footer.md") %}
When you first add grunt-readme to a project, the task will automatically add a readme if it doesn't find one. But it's recommended that you customize you're own README template. Feel free to use [any of the templates](./templates) included in this repo, or copy/past the blow example into `./docs/README.tmpl.md`:

```js
`# [%= name %]

> [%= description %]

[%= toc %]

# Overview
[%= _.doc("overview.md") %]

# Options
[%= _.doc("options.md") %]

# Examples
[%= _.doc("examples.md") %]

# License and Copyright
[%= copyright %]
[%= license %]
```

Then add `overview.md`, `options.md` and `examples.md` to the `./docs` directory. Of course, all of this is completely optional.

Visit the [full documentation →](./DOCS.md) | [See examples →](./DOCS.md#examples)
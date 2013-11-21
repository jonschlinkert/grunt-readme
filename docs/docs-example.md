[Also see examples →](./EXAMPLES.md)

Feel free to use [any of the templates](./templates) included in this repo, or copy/past the blow example into `./docs/README.tmpl.md`:

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
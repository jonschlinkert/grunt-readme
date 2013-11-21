# Features

## Code Comments
Code comments may be used in markdown templates, and they will be stripped from the rendered README as long as they adhere to the following syntax:

```handlebars
[[!-- foo --]]
[[! foo ]]
[[!foo]]
```

## Escaping templates
To prevent Lo-Dash from attempting to evaluat templates that shouldn't be (_as with code examples_), just use square brackets instead of curly braces in any templates that have similar patterns to these: `[%= .. %]`, `[%- .. %]`, and `[% .. %]`. The square brackets will be replaced with curly braces in the rendered output.

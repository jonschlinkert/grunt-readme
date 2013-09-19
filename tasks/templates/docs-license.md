Copyright (c) {%= grunt.template.today('yyyy') %} [{%= author.name %}]({%= author.url %})
Licensed under the [MIT license](./LICENSE-MIT).



{%= licenses ? "; Licensed under the " + _.pluck(licenses, "type").join(", ") : "" %} license{%= licenses.length === 1 ? '' : 's' %}




Licensed under the {%= licenses.join(', ') %} license{%= licenses.length === 1 ? '' : 's' %}
Licensed under the {%= _.pluck(licenses, "type").join(", ") %}
```js
{%= name %} - v{%= version %}
{%= grunt.template.today("yyyy-mm-dd") %}
{%= homepage ? " * " + homepage + "\n" : "" %}
 * Copyright (c) {%= grunt.template.today("yyyy") %} {%= author.name %}
```
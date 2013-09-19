## Heads up!

Please take note! If you add code examples to your templates that have a syntax similar to the Lo-Dash templates used in this project (`[% ... %]`), then it is recommended that you _change the curly braces on the templates to square brackets_ to prevent Lo-Dash from trying to evaluate templates that shouldn't be evaluated. Not to worry though, this plugin will replace your square brackets with curly braces in the rendered output.

So convert anything that has a pattern like this: `[%= ... %]`, `[%- ... %]`, and `[% ... %]`. If anyone has problems, please file an issue and it will be resolved.
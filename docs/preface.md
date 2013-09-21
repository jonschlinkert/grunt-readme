# Heads up!

To prevent Lo-Dash from attempting to evaluat templates that shouldn't be (as in code examples), just use square brackets instead of curly braces in any templates that have similar patterns to these: `[%= .. %]`, `[%- .. %]`, and `[% .. %]`. The square brackets will be replaced with curly braces in the rendered output.
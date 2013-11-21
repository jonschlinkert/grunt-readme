To update these lists, from the root of the project run `node docs/repos && grunt`.

## Helpers
A listing of each plugin and the current version included in this package is listed below.
{% _.each(repos, function(plugin) { %}{% if(/\bhelper\b/g.test(plugin.name)) { %}
+ [{%= plugin.name %}]({%= plugin.url %}): {%= plugin.description.replace(/\{\{/, '`\{\{').replace(/}}/, '}}`') %} {% } %} {% }); %}

{% _.each(repos, function(task) { %}{% if(/\b(grunt-(?:(?!(init|assemble|metadata|data))))\b/g.test(task.name)) { %}

### [{%= task.name %}]({%= task.url %}) [![NPM version](https://badge.fury.io/js/{%= task.name %}.png)](http://badge.fury.io/js/{%= task.name %})
> {%= task.description %} {% } %} {% }); %}



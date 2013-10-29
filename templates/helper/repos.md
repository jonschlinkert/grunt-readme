A listing of each plugin and the current version included in this package is listed below.
{% _.each(repos, function(plugin) { %}{% if(/\bhelper\b/g.test(plugin.name)) { %}
+ [{%= plugin.name %}]({%= plugin.url %}): {%= plugin.description.replace(/\{\{/, '`\{\{').replace(/}}/, '}}`') %} {% } %} {% }); %}

To update this list, from the root of the project run `node docs/repos && grunt`.


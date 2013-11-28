## Related Projects
You might also be interested in these other plugins from the Assemble core team: {% _.each(repos, function(plugin) { %}{% if(/\bcontrib\b/g.test(plugin.name) && plugin.name.indexOf(shortname) === -1) { %}

### [{%= plugin.name %}]({%= plugin.url %}) [![NPM version](https://badge.fury.io/js/{%= plugin.name %}.png)](http://badge.fury.io/js/{%= plugin.name %})
> {%= plugin.description %} {% } %} {% }); %}

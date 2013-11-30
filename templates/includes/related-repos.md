Here are some related projects you might be interested in from the [Assemble](http://assemble.io) core team. {% _.each(repos, function(repo) { %} {%= n %}
### [{%= repo.name %}]({%= repo.url %}) [![NPM version](https://badge.fury.io/js/{%= repo.name %}.png)](http://badge.fury.io/js/{%= repo.name %})
> {%= repo.description %} {% }); %}

Visit [assemble.io/plugins](http:/assemble.io/plugins/) for more information about [Assemble](http:/assemble.io/) plugins.
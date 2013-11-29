Here are some related projects you might be interested in from the [Assemble](http://assemble.io) core team.
{% _.each(repos, function(repo) { %}
+ [{%= repo.name %}]({%= repo.url %}): {%= repo.description %} {% }); %}

Visit [assemble.io/plugins](http:/assemble.io/plugins/) for more information about [Assemble](http:/assemble.io/) plugins.

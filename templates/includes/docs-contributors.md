{% if (contributors) { %}
## Contributors
{% contributors.forEach(function (contributors) { %}
* [{%= contributors.name %}]({%= contributors.url %}){% }) %}
{% } %}

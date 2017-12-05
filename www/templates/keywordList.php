<script type="text/template" id="keywordListTemplate">

	<% _.each(models, function(model) { %>
		<tr data-id="<%= model.get('id') %>">
			<td><a class="row-name" href="#legends/tags/<%= model.get('id') %>"><%= model.get('tag') %></a></td>
			<td><%= model.get('count') %></td>
		</tr>
	<% }); %>

</script>
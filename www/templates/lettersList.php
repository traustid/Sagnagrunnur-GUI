<script type="text/template" id="lettersListTemplate">

	<% _.each(models, function(model) { %>
		<tr>
			<td><a href="#letter/<%= model.get('id') %>" data-id="<%= model.get('id') %>"><%= model.formatDate(model.get('date')) %></a></td>
			<td><a href="#person/<%= model.get('sender').id %>"><%= model.get('sender').name %></a></td>
			<td><a href="#place/<%= model.get('dispatchplace').id %>"><%= model.get('dispatchplace').name %></a></td>
			<td><a href="#person/<%= model.get('receiver').id %>"><%= model.get('receiver').name %></a></td>
			<td><a href="#place/<%= model.get('destinationplace').id %>"><%= model.get('destinationplace').name %></a></td>
		</tr>
	<% }) %>

</script>
<script type="text/template" id="placeListTemplate">

	<% _.each(models, function(model) { %>
		<tr data-id="<%= model.get('id') %>">
			<td><a class="row-name" href="#place/<%= model.get('id') %>"><%= model.get('name') %></a></td>
			<td><a class="row-name" href="#places/municipality/<%= model.get('municipality') %>"><%= model.get('municipalityName') %></a></td>
			<td><a class="row-name" href="#places/county/<%= model.get('county') %>"><%= model.get('countyName') %></a></td>
			<td><%= model.get('coordinates').length > 0 ? '<div class="table-marker location"></div>' : '' %></td>
		</tr>
	<% }); %>

</script>
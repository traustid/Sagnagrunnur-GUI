<script type="text/template" id="legendListTemplate">

	<% _.each(models, function(model) { %>
		<tr data-id="<%= model.get('id') %>">
			<% if (typeof fairyTales != 'undefined' && fairyTales) { %>
				<td><a class="row-name" href="#tale/<%= model.get('id') %>"><%= model.get('name') %></a></td>
				<td>
					<%= model.get('source').author %>, <i><%= model.get('source').collection %></i>. <%= model.get('source').publisher ? model.get('source').publisher+'. ': '' %><%= model.get('source').place %>: <%= model.get('source').press %>, <%= model.get('source').year %>, <%= model.get('source').volume ? model.get('source').volume+', ' : '' %><%= model.get('source').page %>.
				</td>
			<% } else { %>
				<td><a class="row-name" href="#legend/<%= model.get('id') %>"><%= model.get('name') %></a></td>
				<td><%= model.get('source') %></td>
			<% } %>
		</tr>
	<% }); %>

</script>
<script type="text/template" id="personListTemplate">

	<% _.each(models, function(model) { %>
		<tr data-id="<%= model.get('id') %>">
			<td><a class="row-name" href="#<%= fairyTales != undefined && fairyTales == true ? 'talesinformant' : 'person' %>/<%= model.get('id') %>"><%= model.get('name') || model.get('name') == "" || model.get('name') == " " ? model.get('name') : '(ekkert nafn)' %></a></td>
			<td><%= model.get('key') %></td>
			<td><%= model.formatDate(model.get('birth')) %></td>
			<td><%= model.formatDate(model.get('death')) %></td>
		</tr>
	<% }); %>

</script>
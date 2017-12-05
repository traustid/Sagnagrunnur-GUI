<script type="text/template" id="relationTemplate">

	<div class="graph-container">
		<div class="graph-rows">
			<% _.each(models, function(model) { %>
				<div class="graph-row">
					<div class="row-display" style="width: <%= (model.get('count')/maxValue)*100 %>%"><span class="number"><%= model.get('count') %></span></div>
					<% if (disableLinks) { %>
						<div class="label"><%= model.get('name') %></div>
					<% } else { %>
						<a class="label" href="#legends/tags/<%= model.get('id') %>"><%= model.get('name') %></a>
					<% } %>
				</div>
			<% }) %>
		</div>

		<div class="loader">
			<div class="loader-content">
				<div class="spinner"></div>
				<div class="label"><strong>Sæki gögn</strong><br/>Flóknari fyrirspurnir geta tekið ofurlitla stund að birtast</div>
			</div>
		</div>
	</div>

</script>
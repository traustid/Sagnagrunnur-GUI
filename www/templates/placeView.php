<script type="text/template" id="placeViewTemplate">

	<div class="row">
		<div class="twelve columns">
			<h2 style="margin-bottom: 10px"><%= model.get('name') %></h2>
			<h3><%= model.get('municipalityName') %><%= model.get('municipalityName') != null && model.get('countyName') != null ? ', ' : ''%><%= model.get('countyName') %></h3>
		</div>
	</div>

	<hr/>

	<div class="row">
		<% if (model.get('coordinates').length) { %>
			<div class="twelve columns">
				<h3>Staðsetning</h3>
				<div class="map-container"></div>
			</div>
		<% } %>
	</div>

	<hr/>

	<div class="row">
		<% if (model.get('legends') && model.get('legends').length > 0) { %>
			<% if (model.get('people') && model.get('people').length > 0) { %>
				<div class="six columns">
			<% } else { %>
				<div class="twelve columns">
			<% } %>
				<h4>Sagnir</h4>
				<div class="table-wrapper">
					<table class="u-full-width">

						<thead>
							<tr>
								<th width="40%">Sögn</th>
								<th width="60%">Heimild</th>
							</tr>
						</thead>

						<tbody class="list-container">
							<% _.each(model.get('legends'), function(legend) { %>
								<tr>
									<td><a href="#legend/<%= legend.id %>"><%= legend.name %></a></td>
									<td><%= legend.source %></td>
								</tr>
							<% }) %>
						</tbody>
					</table>
				</div>
			</div>
		<% } %>

		<% if (model.get('people') && model.get('people').length > 0) { %>
			<% if (model.get('legends') && model.get('legends').length > 0) { %>
				<div class="six columns">
			<% } else { %>
				<div class="twelve columns">
			<% } %>
				<h4>Einstaklingar</h4>
				<div class="table-wrapper">
					<table class="u-full-width">

						<thead>
							<tr>
								<th width="80%">Nafn</th>
								<th width="20%"></th>
							</tr>
						</thead>

						<tbody class="list-container">
							<% _.each(model.get('people'), function(person) { %>
								<tr>
									<td><a href="#person/<%= person.id %>"><%= person.name %></a></td>
									<td>
										<%= person.birth ? person.birth.split('-')[0] : '' %>
										<%= person.birth && person.death ? ' - ' : '' %>
										<%= person.death ? person.death.split('-')[0] : '' %>
									</td>
								</tr>
							<% }) %>
						</tbody>
					</table>
				</div>
			</div>
		<% } %>
	</div>

	<div class="footer-toolbar">
		<div class="container">
			<div class="row">
				<div class="twelve columns">
					<a class="button" onclick="javascript:history.go(-1)">Til baka</a>
				</div>
			</div>
		</div>
	</div>

</script>
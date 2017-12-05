<script type="text/template" id="taleViewTemplate">

	<div class="row">
		<div class="twelve columns">
			<strong>Ævintýragrunnur:</strong>&nbsp;&nbsp;&nbsp;<a class="button button-small" href="/aevintyri#abbreviations">Skammstafanir</a> <a class="button button-small" href="/aevintyri">Nánar um ævintýragrunninn</a>
			<hr/>
		</div>
	</div>

	<div class="row">
		<div class="twelve columns">
			<h2 style="margin-bottom: 10px"><%= model.get('name') %></h2>
			<p class="text-light">
				<%= model.get('source').author %>, <i><%= model.get('source').collection %></i>. <%= model.get('source').publisher ? model.get('source').publisher+'. ': '' %><%= model.get('source').place %>: <%= model.get('source').press %>, <%= model.get('source').year %>, <%= model.get('source').volume ? model.get('source').volume+', ' : '' %><%= model.get('source').page %>.

			</p>
		</div>
	</div>

	<hr/>

	<div class="row">
		<div class="six columns">
			<h3>Útdráttur</h3>
			<%= model.get('summary') %>

			<hr/>

			<% if (model.get('comment')) { %>
				<h3>Athugasemd</h3>
				<p><%= model.get('comment') %></p>
			<% } %>
		</div>

		<div class="six columns">

			<% if (model.get('category')) { %>
				<h3>Flokkun</h3>
				<p><a href="#tales/category/<%= model.get('category') %>"><%= model.get('category') %></a></p>
			<% } %>
			
			<% if (model.get('at')) { %>
				<h3>AT/ATU-númer</h3>
				<p><a href="#tales/at/<%= model.get('at') %>"><%= model.get('at') %></a></p>
			<% } %>
			
			<% if (model.get('ms')) { %>
				<h3>Handrit</h3>
				<p><%= model.get('ms') %></p>
			<% } %>
			
			<% if (model.get('source').editions) { %>
				<h3>Aðrar útgáfur</h3>
				<p><%= model.get('source').editions %></p>
			<% } %>
			
			<% if (model.get('comment') || model.get('at')) { %>
				<hr/>
			<% } %>

			<% if (model.get('informants') && model.get('informants').length > 0) { %>
				<h3>Tengdir einstaklingar</h3>
				<div class="table-wrapper">
					<table class="u-full-width">

						<thead>
							<tr>
								<th width="60%">Nafn</th>
								<th width="40%"></th>
							</tr>
						</thead>

						<tbody class="list-container">
							<% _.each(model.get('informants'), function(informant) { %>
								<tr>
									<td><a href="#person/<%= informant.id %>"><%= informant.name %></a></td>
									<td><%= informant.type == 'ts' ? 'Skrásetjari' : informant.type == 'th' ? 'Heimildamaður' : '' %></td>
								</tr>
							<% }) %>
						</tbody>
					</table>
				</div>
			<% } %>

		</div>
	</div>

	<% if (_.filter(model.get('places'), function(place) { return place.coordinates.length > 0; }).length > 0) { %>
	
		<hr/>
	
		<div class="row">
			<div class="twelve columns">
				<h3>Sögustaðir</h3>
				<div class="map-container"></div>
			</div>
		</div>
	<% } %>

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

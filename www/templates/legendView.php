<script type="text/template" id="legendViewTemplate">
	<div class="row">
		<div class="twelve columns">
			<h2 style="margin-bottom: 10px"><%= model.get('name') %></h2>
			<p class="text-light"><%= model.get('source') %></p>
			<% if (model.get('pages') && model.get('pages').length > 0) { %>
				<p><strong>Tengill á bókarsíðu:</strong> <a href="<%= model.get('pages')[0].url %>" target="_blank"><%= model.get('pages')[0].url %></a></p>
			<% } %>
		</div>
	</div>

	<hr/>

	<div class="row">
		<div class="six columns">
			<h3>Útdráttur</h3>
			<%= model.get('summary') %>
		
			<% if (model.get('manuscripts') && model.get('manuscripts').length > 0) { %>
				<hr/>

				<h3>Tengd handrit</h3>
				<div class="table-wrapper">
					<table class="u-full-width">

						<thead>
							<tr>
								<th width="30%">Handrit</th>
								<th width="25%">Síða</th>
								<th width="20%"></th>
								<th width="20%"></th>
							</tr>
						</thead>

						<tbody class="list-container">
							<% _.each(model.get('manuscripts'), function(msitem) { %>
								<tr>
									<td><a href="#manuscript/<%= msitem.manuscript %>/<%= msitem.id %>"><%= msitem.manuscript_name %></a></td>
									<td><%= msitem.page_from %>-<%= msitem.page_to %></td>
									<td><%= msitem.book_reference ? '<a target="_blank" href="'+msitem.book_reference+'">Bókarsíða</a>' : '' %></td>
									<td><%= msitem.image ? '<a target="_blank" href="https://image.landsbokasafn.is/source/'+msitem.image.image+'"><img src="https://image.landsbokasafn.is/source/'+msitem.image.thumb+'" /></a>' : '' %></td>
								</tr>
							<% }) %>
						</tbody>
					</table>
				</div>
			<% } %>

			<% if (model.get('summary').length < 1000 && (model.get('recordtime') || model.get('legenddates'))) { %>

				<hr/>

				<div class="row">

					<% if (model.get('recordtime')) { %>
						<div class="<%= model.get('recordtime') && model.get('legenddates') ? 'six' : 'twelve' %> columns">
							<h3>Skráningarár</h3>
							<%= model.get('recordtime') %>
						</div>
					<% } %>

					<% if (model.get('legenddates')) { %>
						<div class="<%= model.get('recordtime') && model.get('legenddates') ? 'six' : 'twelve' %> columns">
							<h3>Tímasetningar</h3>
							<%= model.get('legenddates') %>
						</div>
					<% } %>
				
				</div>

			<% } %>

		</div>

		<div class="six columns">
			<h3>Efnisorð</h3>
			<% _.each(model.get('tags'), function(tag) { %>
				<a class="button button-small" href="#legends/tags/<%= tag.id %>"><%= tag.tag %></a>
			<% }) %>
			
			<hr/>

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
								<td><%= informant.type == 's' ? 'Sendandi' : informant.type == 'h' ? 'Heimildamaður' : informant.type = 'sk' ? 'Skrásetjari' : '' %></td>
							</tr>
						<% }) %>
					</tbody>
				</table>
			</div>

			<% if (model.get('summary').length >= 1000 && (model.get('recordtime') || model.get('legenddates'))) { %>

				<hr/>

				<div class="row">

					<% if (model.get('recordtime')) { %>
						<div class="<%= model.get('recordtime') && model.get('legenddates') ? 'six' : 'twelve' %> columns">
							<h3>Skráningarár</h3>
							<%= model.get('recordtime') %>
						</div>
					<% } %>

					<% if (model.get('legenddates')) { %>
						<div class="<%= model.get('recordtime') && model.get('legenddates') ? 'six' : 'twelve' %> columns">
							<h3>Tímasetningar</h3>
							<%= model.get('legenddates') %>
						</div>
					<% } %>
				
				</div>

			<% } %>

		</div>
	</div>


	<% if (_.filter(model.get('places'), function(place) { return place.coordinates.length > 0; }).length > 0) { %>
	
		<hr/>
	
		<div class="row">
			<div class="twelve columns">
				<h3>Sögustaðir</h3>
				<div class="map-wrapper">
					<div class="map-container"></div>
				</div>
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
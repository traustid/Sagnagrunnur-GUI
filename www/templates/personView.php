<script type="text/template" id="personViewTemplate">

	<div class="row">
		<div class="twelve columns">
			<% if (model.get('key')) { %>
				<div class="u-pull-right text-light h5"><%= model.get('key') %></div>
			<% } %>
			<h2><%= model.get('name') %></h2>
			<h3><%= model.get('status') %><%= model.get('status') && model.get('nick') ? ', ' : '' %><i class="text-light"><%= model.get('nick') %></i></h3>
		</div>
	</div>

	<hr/>

	<div class="row">
		<% if (model.get('bio') || model.get('birth') || model.get('death')) { %>
			<div class="six columns">
				<h3>Æviatriði</h3>
				<p><%= model.get('bio') %></p>

				<% if (model.get('birth') || model.get('death')) { %>
					<div class="row">

						<% if (model.get('birth')) { %>
							<div class="six columns">
								<h3>Fæðingardagur</h3>
								<p><%= model.formatDate(model.get('birth')) %></p>
							</div>
						<% } %>

						<% if (model.get('death')) { %>
							<div class="six columns">
								<h3>Dánardagur</h3>
								<p><%= model.formatDate(model.get('death')) %></p>
							</div>
						<% } %>

					</div>
				<% } %>

			</div>
		<% } %>

		<% if (model.get('bio')) { %>
			<div class="six columns">
		<% } else { %>
			<div class="twelve columns">
		<% } %>

		<% if (model.get('homes') && model.get('homes').length > 0) { %>

			<h3>Heimili</h3>

			<% if (model.get('homes') && model.get('homes').length > 0) { %>
				<div class="table-wrapper">
					<table class="u-full-width">

						<thead>
							<tr>
								<th width="40%">Staður</th>
								<th width="60%">Sýsla</th>
							</tr>
						</thead>

						<tbody class="list-container">
							<% _.each(model.get('homes'), function(home) { %>
								<tr>
									<td><a href="#place/<%= home.id %>"><%= home.name %></a></td>
									<td><%= home.countyName %></td>
								</tr>
							<% }) %>
						</tbody>
					</table>
				</div>
			<% } %>

		<% } %>
		</div>
	</div>

	<% if (model.get('bio') || model.get('birth') || model.get('death')) { %>
		<hr/>
	<% } %>


	<div class="row">

		<div class="twelve columns">
			<div class="map-wrapper">
				<div class="homes-map-container map-container"></div>
			</div>
		</div>

	</div>

	<hr/>

	<div class="row">
		<div class="twelve columns tabs-control">
			<ul class="tabs">
				<% if (model.get('legends').informant || model.get('legends').collector || model.get('legends').recorder) { %>
					<li><a data-tab="legendsTab">Sagnir</a></li>
				<% } %>
				<% if (model.get('tales').informant || model.get('tales').collector) { %>
					<li><a data-tab="talesTab">Ævintýri</a></li>
				<% } %>
				<% if (model.get('informants')) { %>
					<li><a data-tab="informantsTab">Heimildamenn</a></li>
				<% } %>
				<% if (model.get('recorders')) { %>
					<li><a data-tab="recordersTab">Skrásetjarar</a></li>
				<% } %>
				<% if (model.get('manuscripts') && model.get('manuscripts').length > 0) { %>
					<li><a data-tab="manuscriptsTab">Handrit</a></li>
				<% } %>
				<% if (model.get('letters').to || model.get('letters').from) { %>
					<li><a data-tab="lettersTab">Bréf</a></li>
				<% } %>
			</ul>

			<div class="tabs-content">
				<% if (model.get('legends').informant || model.get('legends').collector || model.get('legends').recorder) { %>
					<div id="legendsTab" class="tab">
						<h3>Sagnir</h3>

						<% if (model.get('legends').informant) { %>
							<h4>Heimildamaður</h4>
							<div class="table-wrapper">
								<table class="u-full-width">

									<thead>
										<tr>
											<th width="40%">Sögn</th>
											<th width="60%">Heimild</th>
										</tr>
									</thead>

									<tbody class="list-container">
										<% _.each(model.get('legends').informant, function(legend) { %>
											<tr>
												<td><a href="#legend/<%= legend.id %>"><%= legend.name %></a></td>
												<td><%= legend.source %></td>
											</tr>
										<% }) %>
									</tbody>
								</table>
							</div>
						<% } %>

						<% if (model.get('legends').recorder) { %>
							<h4>Skrásetjari</h4>
							<div class="table-wrapper">
								<table class="u-full-width">

									<thead>
										<tr>
											<th width="40%">Sögn</th>
											<th width="60%">Heimild</th>
										</tr>
									</thead>

									<tbody class="list-container">
										<% _.each(model.get('legends').recorder, function(legend) { %>
											<tr>
												<td><a href="#legend/<%= legend.id %>"><%= legend.name %></a></td>
												<td><%= legend.source %></td>
											</tr>
										<% }) %>
									</tbody>
								</table>
							</div>
						<% } %>

						<% if (model.get('legends').collector) { %>
							<h4>Sendandi</h4>
							<div class="table-wrapper">
								<table class="u-full-width">

									<thead>
										<tr>
											<th width="40%">Sögn</th>
											<th width="60%">Heimild</th>
										</tr>
									</thead>

									<tbody class="list-container">
										<% _.each(model.get('legends').collector, function(legend) { %>
											<tr>
												<td><a href="#legend/<%= legend.id %>"><%= legend.name %></a></td>
												<td><%= legend.source %></td>
											</tr>
										<% }) %>
									</tbody>
								</table>
							</div>
						<% } %>
					</div>
				<% } %>

				<% if (model.get('tales').informant || model.get('tales').collector) { %>
					<div id="talesTab" class="tab">
						<h3>Ævintýri</h3>

						<% if (model.get('tales').collector) { %>
							<h4>Skrásetjari</h4>
							<div class="table-wrapper">
								<table class="u-full-width">

									<thead>
										<tr>
											<th width="40%">Ævintýri</th>
											<th width="60%">Heimild</th>
										</tr>
									</thead>

									<tbody class="list-container">
										<% _.each(model.get('tales').collector, function(tale) { %>
											<tr>
												<td><a href="#tale/<%= tale.id %>"><%= tale.name %></a></td>
												<td><%= tale.source.author %>, <i><%= tale.source.collection %></i>. <%= tale.source.publisher ? tale.source.publisher+'. ': '' %><%= tale.source.place %>: <%= tale.source.press %>, <%= tale.source.year %>, <%= tale.source.volume ? tale.source.volume+', ' : '' %><%= tale.source.page %>.</td>
											</tr>
										<% }) %>
									</tbody>
								</table>
							</div>
						<% } %>

						<% if (model.get('tales').informant) { %>
							<h4>Heimildamaður</h4>
							<div class="table-wrapper">
								<table class="u-full-width">

									<thead>
										<tr>
											<th width="40%">Sögn</th>
											<th width="60%">Heimild</th>
										</tr>
									</thead>

									<tbody class="list-container">
										<% _.each(model.get('tales').informant, function(tale) { %>
											<tr>
												<td><a href="#tale/<%= tale.id %>"><%= tale.name %></a></td>
												<td><%= tale.source.author %>, <i><%= tale.source.collection %></i>. <%= tale.source.publisher ? tale.source.publisher+'. ': '' %><%= tale.source.place %>: <%= tale.source.press %>, <%= tale.source.year %>, <%= tale.source.volume ? tale.source.volume+', ' : '' %><%= tale.source.page %>.</td>
											</tr>
										<% }) %>
									</tbody>
								</table>
							</div>
						<% } %>
					</div>
				<% } %>

				<% if (model.get('informants')) { %>
					<div id="informantsTab" class="tab">
						<h3>Heimildamenn</h3>

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
											<td>
												<%= informant.birth ? informant.birth.split('-')[0] : '' %>
												<%= informant.birth && informant.death ? ' - ' : '' %>
												<%= informant.death ? informant.death.split('-')[0] : '' %>
											</td>
										</tr>
									<% }) %>
								</tbody>
							</table>
						</div>
					</div>
				<% } %>

				<% if (model.get('recorders')) { %>
					<div id="recordersTab" class="tab">
						<h3>Skrásetjarar</h3>

						<div class="table-wrapper">
							<table class="u-full-width">

								<thead>
									<tr>
										<th width="60%">Nafn</th>
										<th width="40%"></th>
									</tr>
								</thead>

								<tbody class="list-container">
									<% _.each(model.get('recorders'), function(recorder) { %>
										<tr>
											<td><a href="#person/<%= recorder.id %>"><%= recorder.name %></a></td>
											<td>
												<%= recorder.birth ? recorder.birth.split('-')[0] : '' %>
												<%= recorder.birth && recorder.death ? ' - ' : '' %>
												<%= recorder.death ? recorder.death.split('-')[0] : '' %>
											</td>
										</tr>
									<% }) %>
								</tbody>
							</table>
						</div>
					</div>
				<% } %>

				<% if (model.get('manuscripts')) { %>
					<div id="manuscriptsTab" class="tab">
						<h3>Handrit</h3>

						<div class="table-wrapper">
							<table class="u-full-width">

								<thead>
									<tr>
										<th width="25%">Handrit</th>
										<th width="35%">Titill í handriti</th>
										<th width="10%">Blaðsíða</th>
										<th width="10%">Blaðsíður (locus)</th>
										<th width="20%">Tenging við handrit</th>
									</tr>
								</thead>

								<tbody class="list-container">
									<% _.each(model.get('manuscripts'), function(msitem) { %>
										<tr>
											<td><%= msitem.name %></a></td>
											<td><%= msitem.itemtitle %></a></td>
											<td><%= msitem.page.number %></a></td>
											<td><%= msitem.page.from %> - <%= msitem.page.to %></a></td>
											<td><%= msitem.connectiontype == 'col' ? 'Safnari' : msitem.connectiontype == 'scr' ? 'Skrifari' : msitem.connectiontype == 'inf' ? 'Heimildamaður' : '' %></a></td>
										</tr>
									<% }) %>
								</tbody>
							</table>
						</div>

					</div>
				<% } %>

				<% if (model.get('letters').from || model.get('letters').to) { %>
					<div id="lettersTab" class="tab">
						<h3>Bréf</h3>

						<% if (model.get('letters').to) { %>
							<h4>Send til: <%= model.get('name') %></h4>
	
							<div class="letters-to-map-wrapper">
								<div class="map-container"></div>
							</div><br/><br/>

							<div class="table-wrapper">
								<table class="u-full-width">

									<thead>
										<tr>
											<th width="25%">Dagsetning</th>
											<th width="25%">Sendandi</th>
											<th width="25%">Sendingarstaður</th>
											<th width="25%">Viðtökustaður</th>
										</tr>
									</thead>

									<tbody class="list-container">
										<% _.each(model.get('letters').to, function(letter) { %>
											<tr>
												<td><a href="<%= letter.uri %>" target="_blank"><%= model.formatDate(letter.date) %></a></td>
												<td><a href="#person/<%= letter.sender.id %>"><%= letter.sender.name %></a></td>
												<td><a href="#place/<%= letter.dispatchplace.id %>"><%= letter.dispatchplace.name %></a></td>
												<td><a href="#place/<%= letter.destinationplace.id %>"><%= letter.destinationplace.name %></a></td>
											</tr>
										<% }) %>
									</tbody>
								</table>
							</div>
						<% } %>

						<% if (model.get('letters').from) { %>
							<h4>Sem <%= model.get('name') %> sendi</h4>

							<div class="letters-from-map-container map-container"></div><br/><br/>

							<div class="table-wrapper">
								<table class="u-full-width">

									<thead>
										<tr>
											<th width="25%">Dagsetning</th>
											<th width="25%">Viðtakandi</th>
											<th width="25%">Sendingarstaður</th>
											<th width="25%">Viðtökustaður</th>
										</tr>
									</thead>

									<tbody class="list-container">
										<% _.each(model.get('letters').from, function(letter) { %>
											<tr>
												<td><a href="<% letter.uri %>" target="_blank"><%= model.formatDate(letter.date) %></a></td>
												<td><a href="#person/<%= letter.receiver.id %>"><%= letter.receiver.name %></a></td>
												<td><a href="#place/<%= letter.dispatchplace.id %>"><%= letter.dispatchplace.name %></a></td>
												<td><a href="#place/<%= letter.destinationplace.id %>"><%= letter.destinationplace.name %></a></td>
											</tr>
										<% }) %>
									</tbody>
								</table>
							</div>
						<% } %>

					</div>
				<% } %>

			</div>

		</div>
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
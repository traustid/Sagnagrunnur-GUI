<script type="text/template" id="manuscriptViewTemplate">

	<div class="row">
		<div class="twelve columns">
			<h2>Handrit: <%= model.get('title') %></h2>
		</div>
	</div>

	<div class="row">
		<div class="twelve columns">

			<% if (model.get('msitems') && model.get('msitems').length > 0) { %>
				<% _.each(model.get('msitems'), function(msitem) { %>
					<a name="msitem-<%= msitem.id %>"/>
					<div class="info-wrapper">
						<h3><%= msitem.title %></h3>

						<hr/>

						<div class="row">
							<div class="four columns">
								<p><%= msitem.image ? '<a target="_blank" class="image-link" href="https://image.landsbokasafn.is/source/'+msitem.image.image+'"><img src="https://image.landsbokasafn.is/source/'+msitem.image.thumb+'" /></a>' : '' %></p>
							</div>

							<div class="eight columns">
								<% if (msitem.note) { %>
									<h4>Athugasemd</h4>
									<p><%= msitem.note.split('<ref target="http://').join('<a target="_blank" href="http://').split('</ref>').join('</a>') %></p>
								<% } %>

								<h4>Síður</h4>
								<p><%= msitem.pagefrom %> - <%= msitem.pageto %></p>
							</div>

						</div>

						<hr/>

						<div class="row">

							<div class="four columns">
								<h4>Tengdir einstaklingar</h4>
								<div class="table-wrapper">
									<table class="u-full-width">

										<thead>
											<tr>
												<th width="60%">Nafn</th>
												<th width="40%"></th>
											</tr>
										</thead>

										<tbody class="list-container">
											<% _.each(msitem.persons, function(person) { %>
												<tr>
													<td><a href="#person/<%= person.id %>"><%= person.name %></a></td>
													<td><%= person.type == 'scr' ? 'Skrifari' : person.type == 's' ? 'Sendandi' : person.type == 'inf' ? 'Heimildamaður' : person.type == 'col' ? 'Safnari' : '' %></td>
												</tr>
											<% }) %>
										</tbody>
									</table>
								</div>
							</div>

							<div class="eight columns">

								<% if (msitem.legends) { %>
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
												<% _.each(msitem.legends, function(legend) { %>
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

						</div>

					</div>

				<% }) %>
			<% } %>

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
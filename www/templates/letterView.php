<script type="text/template" id="letterViewTemplate">
	<div class="row">
		<div class="twelve columns">
			<h2 style="margin-bottom: 10px">Bréf sent <%= model.formatDate(model.get('date')) %></h2>
		</div>
	</div>

	<hr/>

	<div class="row">

		<div class="six columns">

			<h3>Sendandi</h3>

			<table class="u-full-width">

				<thead>
					<tr>
						<th width="50%">Nafn</th>
						<th width="50%">Sendingarstaður</th>
					</tr>
				</thead>

				<tbody class="list-container">
					<tr>
						<td><a href="#person/<%= model.get('sender').id %>"><%= model.get('sender').name %></a></td>
						<td><a href="#place/<%= model.get('dispatchplace').id %>"><%= model.get('dispatchplace').name %></a></td>
					</tr>
				</tbody>
			</table>

			<h3>Viðtakandi</h3>
			
			<table class="u-full-width">

				<thead>
					<tr>
						<th width="50%">Nafn</th>
						<th width="50%">Viðtökustaður</th>
					</tr>
				</thead>

				<tbody class="list-container">
					<tr>
						<td><a href="#person/<%= model.get('receiver').id %>"><%= model.get('receiver').name %></a></td>
						<td><a href="#place/<%= model.get('destinationplace').id %>"><%= model.get('destinationplace').name %></a></td>
					</tr>
				</tbody>
			</table>

			<div class="map-wrapper"><div class="map-container"></div></div>

		</div>

		<div class="six columns">
			<h3>Uppskrift bréfs</h3>
			<% if (model.get('url') && model.get('url') != '') { %>
				<p><a href="<%= model.get('url') %>" target="_blank">Tengill á Einkaskjöl.is</a></p>
			<% } %>
			<div class="table-wrapper">
				<%= model.get('letterbody') %>
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
<script type="text/template" id="legendListViewTemplate">
	<% if (options && options.fairyTales) { %>
		<div class="row">
			<div class="twelve columns">
				<strong>Ævintýragrunnur:</strong>&nbsp;&nbsp;&nbsp;<a class="button button-small" href="/aevintyri#abbreviations">Skammstafanir</a> <a class="button button-small" href="/aevintyri">Nánar um ævintýragrunninn</a>
				<hr/>
			</div>
		</div>

	<% } else { %>
		<div class="row">
			<div class="twelve columns search-form">

				<div class="u-pull-left margin-right-15">
					<label><%= l.get('Þjóðsagnasafn') %>:</label>
					<select class="search-form-collection">
						<option value=""></option>
						<option value="1">Arngrímur Fr. Bjarnason, Vestfirzkar þjóðsögur</option>
						<option value="2">Einar Guðmundsson, Íslenskar þjóðsögur</option>
						<option value="3">Guðmundur Jónsson í Hoffelli, Skaftfellskar þjóðsögur og sagnir</option>
						<option value="4">Guðni Jónsson, Íslenskir sagnaþættir og þjóðsögur</option>
						<option value="5">Helgi Guðmundsson, Vestfirzkar sagnir</option>
						<option value="6">Huld</option>
						<option value="7">Ingólfur Jónsson, Þjóðlegar sagnir og ævintýri</option>
						<option value="8">Jóh. Örn Jónsson, Sagnablöð hin nýju</option>
						<option value="9">Jón Árnason, Íslenzkar þjóðsögur og æfintýri</option>
						<option value="10">Jón Þorkelsson, Þjóðsögur og munnmæli</option>
						<option value="11">Magnús Bjarnason, Þjóðsagnakver</option>
						<option value="12">Oddur Björnsson. Þjóðtrú og þjóðsagnir</option>
						<option value="13">Ólafur Davíðsson, Íslenzkar þjóðsögur</option>
						<option value="14">Rauðskinna hin nýrri</option>
						<option value="15">Sigfús Sigfússon, Íslenskar þjóðsögur og sagnir</option>
						<option value="16">Sigurður Nordal og Þórbergur Þórðarson, Gráskinna hin meiri</option>
						<option value="17">Torfhildur Þorsteinsdóttir Hólm, Þjóðsögur og sagnir</option>
						<option value="18">Siglfirskar þjóðsögur og sagnir</option>
						<option value="19">Þórður Tómasson, Eyfellskar sagnir</option>
						<option value="20">Þorsteinn Erlingsson, Þjóðsögur Þorsteins Erlingsonar</option>
						<option value="21">Þorsteinn M. Jónsson, Gríma hin nýja</option>
					</select>
				</div>

				<div class="u-pull-left margin-right-15">
					<label><%= l.get('Efnisorð') %>:</label>
					<div class="dropdown-control search-form-tag-select">
						<button class="button dropdown-trigger"><%= l.get('Velja efnisorð') %></button>
						<div class="dropdown-container">
	
							<div class="tags-list select-list"></div>

							<div class="dropdown-content">
								<input type="text" class="input-search-tags" placeholder="<%= l.get('Leit að efnisorði') %>"/>
								<button class="button button-primary select-deselect"><%= l.get('Hreinsa val') %></button>
							</div>
	
						</div>
					</div>
				</div>

				<div class="u-pull-left margin-right-15">
					<label><%= l.get('Leit í heiti eða efni') %>:</label>
					<input type="text" class="search-form-search-query"/>
				</div>

				<div class="u-pull-left margin-right-15">
					<label><%= l.get('Handrit') %>:</label>
					<input type="text" class="search-form-manuscript"/>
				</div>

				<div class="u-cf"></div>

				<div class="u-pull-left margin-right-15">
					<label><%= l.get('Tenging við einstakling') %>:</label>
					<select class="search-form-person-relation">
						<option value=""></option>
						<option value="h"><%= l.get('Heimildamaður') %></option>
						<option value="sk"><%= l.get('Skrásetjari') %></option>
						<option value="s"><%= l.get('Sendandi') %></option>
					</select>
				</div>

				<div class="u-pull-left margin-right-15">
					<label><%= l.get('Sýsla') %> <span class="person-definition-label"><%= l.get('einstaklings') %></span>:</label>
					<select class="search-form-person-county">
						<option value=""></option>
						<option value="1">Árnessýsla</option>
						<option value="2">Austur-Barðastrandarsýsla</option>
						<option value="3">Austur-Húnavatnssýsla</option>
						<option value="4">Austur-Skaftafellssýsla</option>
						<option value="5">Borgarfjarðarsýsla</option>
						<option value="6">Dalasýsla</option>
						<option value="7">Eyjafjarðarsýsla</option>
						<option value="8">Gullbringusýsla</option>
						<option value="9">Kjósarsýsla</option>
						<option value="10">Mýrasýsla</option>
						<option value="11">Norður-Ísafjarðarsýsla</option>
						<option value="12">Norður-Múlasýsla</option>
						<option value="13">Norður-Þingeyjarsýsla</option>
						<option value="14">Rangárvallasýsla</option>
						<option value="15">Skagafjarðarsýsla</option>
						<option value="16">Snæfellsnes-og Hnappadalssýsla</option>
						<option value="17">Strandasýsla</option>
						<option value="18">Suður-Múlasýsla</option>
						<option value="19">Suður-Þingeyjarsýsla</option>
						<option value="20">Vestur-Barðastrandarsýsla</option>
						<option value="21">Vestur-Húnavatnssýsla</option>
						<option value="22">Vestur-Ísafjarðarsýsla</option>
						<option value="23">Vestur-Skaftafellssýsla</option>
						<option value="24">Útlönd</option>
						<option value="25">Undraland</option>
					</select>
				</div>

				<div class="u-pull-left margin-right-15">
					<label><%= l.get('Hreppur') %> <span class="person-definition-label"><%= l.get('einstaklings') %></span>:</label>
					<select class="search-form-person-municipality" style="min-width: 150px">
						<option value=""></option>
					</select>
				</div>

				<div class="u-pull-left margin-right-15">
					<label><%= l.get('Kyn') %> <span class="person-definition-label"><%= l.get('einstaklings') %></span>:</label>
					<select class="search-form-person-gender" style="min-width: 150px">
						<option value=""></option>
						<option value="0"><%= l.get('Karl') %></option>
						<option value="1"><%= l.get('Kona') %></option>
					</select>
				</div>

				<div class="u-cf"></div>

				<button class="button button-primary search-button"><%= l.get('Leita') %></button>


			</div>
		</div>

		<hr/>

		<div class="info-panel"><div class="inline-info">!</div><i class="search-explanation"></i></div><br/>

		<div class="row">
			<div class="twelve columns">
				<div class="tabs-control">

					<ul class="tabs">
						<li><a data-tab="mapTab"><%= l.get('Sögustaðir') %></a></li>
						<li><a data-tab="tagRelationTab"><%= l.get('Efnisorð') %></a></li>
						<li><a data-tab="sourceRelationTab"><%= l.get('Þjóðsagnasöfn') %></a></li>
						<li><a data-tab="yearsRelationTab"><%= l.get('Fæðingar- og dánarár') %></a></li>
					</ul>

					<div class="tabs-content">

						<div id="mapTab" class="tab legends-map">

							<div class="map-wrapper">
								<div class="map-container"></div>
								<div class="place-number"></div>
								<div class="loader">
									<div class="loader-content">
										<div class="spinner"></div>
										<div class="label"><strong><%= l.get('Sæki gögn fyrir kort') %></strong><br/><%= l.get('Flóknari fyrirspurnir geta tekið ofurlitla stund að birtast') %></div>
									</div>
								</div>
							</div>
						</div>

						<div id="tagRelationTab" class="tab related-tags-view"></div>

						<div id="sourceRelationTab" class="tab related-source-view"></div>

						<div id="yearsRelationTab" class="tab related-years-view"></div>

					</div>

				</div>
			</div>
		</div>

		<hr/>
	<% } %>

	<div class="row">

		<div class="twelve columns">

			<h4 class="legends-number"></h4>

			<table class="u-full-width">

				<thead>
					<tr>
						<th width="40%"><a class="column-sort" href="#" data-sort="name"><%= l.get('Nafn') %></a></th>
						<th width="60%"><a class="column-sort" href="#" data-sort="name"><%= l.get('Heimild') %></a></th>
					</tr>
				</thead>

				<tbody class="list-container">

				</tbody>

			</table>

		</div>

	</div>

	<div class="footer-toolbar">
		<div class="container">
			<div class="row">
				<div class="eight columns">
					<a class="button prev">Fyrri síða</a>
					<a class="button next">Næsta síða</a>
					<span class="page-info"></span>
				</div>
				<div class="four columns">
					<input type="text" class="search-input u-pull-right" placeholder="Leit">
				</div>
			</div>
		</div>
	</div>
</script>
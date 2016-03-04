<div id="MyWidget_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide" data-params="MyDataTable.instance()">
<h1>${i18n.getTranslation('mydatatable.title')}</h1>

	<div class="bs-example">
		<div class="row">
			<div class="col-md-12" id="target" data-isolated-scroll=""
				style="zoom: 1;">

				<script type="text/template" class="mydatatable-template-row-area-buttons">
					<div id="datatable-area" class="panel-heading">
						<div class="row">
							<div id="datatable-area-action" class="col-md-9">
								<button class="btn btn-primary" data-datatable-add-row="">Add
								</button>
								<button class="btn btn-primary" data-datatable-del-row="">Remove
								</button>
								<button class="btn btn-primary" data-datatable-edit-row="">Edit
								</button>
								<div class="btn-group">
									<button type="button" class="btn btn-primary dropdown-toggle"
										data-toggle="dropdown" aria-expanded="false">
										More
										<span class="caret"></span>
									</button>
									<ul class="dropdown-menu" role="menu">
										<li>
											<a data-datatable-show-column="" href="#">Show column 2</a>
										</li>
										<li>
											<a data-datatable-hide-column="" href="#">Hide column 2</a>
										</li>
										<li>
											<a data-datatable-reload="" href="#">Reload</a>
										</li>
										<li>
											<a data-datatable-selected="" href="#">Selected</a>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</script>

				<div id="idtable_${instanceId}"></div>



			</div>
		</div>
	</div>
</div>

<script type="text/template" class="template_datatable_edit">
    <tr id="area-edit" class="{{classSelected}}">
        <td>{{id}}<input type="hidden" value="{{id}}" id="datatable-input-id"></td>
        <td><input type="text" class="datatable-edit form-control" value="{{name}}" id="datatable-input-name"></td>
        <td>
		<select class="form-control" value="{{uf}}" id="datatable-input-uf">
			<option value="AC">AC</option>
			<option value="AL">AL</option>
			<option value="AM">AM</option>
			<option value="AP">AP</option>
			<option value="BA">BA</option>
			<option value="CE">CE</option>
			<option value="DF">DF</option>
			<option value="ES">ES</option>
			<option value="GO">GO</option>
			<option value="MA">MA</option>
			<option value="MG">MG</option>
			<option value="MS">MS</option>
			<option value="MT">MT</option>
			<option value="PA">PA</option>
			<option value="PB">PB</option>
			<option value="PE">PE</option>
			<option value="PI">PI</option>
			<option value="PR">PR</option>
			<option value="RJ">RJ</option>
			<option value="RN">RN</option>
			<option value="RO">RO</option>
			<option value="RR">RR</option>
			<option value="RS">RS</option>
			<option value="SC">SC</option>
			<option value="SE">SE</option>
			<option value="SP">SP</option>
			<option value="TO">TO</option>
			<option value="AL">AL</option>
			<option value="AK">AK</option>
			<option value="AR">AR</option>
			<option value="AZ">AZ</option>
			<option value="CA">CA</option>
			<option value="KS">KS</option>
			<option value="NC">NC</option>
			<option value="SC">SC</option>
			<option value="CO">CO</option>
			<option value="CT">CT</option>
			<option value="ND">ND</option>
			<option value="SD">SD</option>
			<option value="DE">DE</option>
			<option value="FL">FL</option>
			<option value="GA">GA</option>
			<option value="HI">HI</option>
			<option value="RI">RI</option>
			<option value="IL">IL</option>
			<option value="IN">IN</option>
			<option value="IA">IA</option>
			<option value="KY">KY</option>
			<option value="LA">LA</option>
			<option value="ME">ME</option>
			<option value="MD">MD</option>
			<option value="MA">MA</option>
			<option value="MI">MI</option>
			<option value="MN">MN</option>
			<option value="MS">MS</option>
			<option value="MO">MO</option>
			<option value="MT">MT</option>
			<option value="NE">NE</option>
			<option value="NV">NV</option>
			<option value="NH">NH</option>
			<option value="NJ">NJ</option>
			<option value="NY">NY</option>
			<option value="NM">NM</option>
			<option value="OK">OK</option>
			<option value="OH">OH</option>
			<option value="OR">OR</option>
			<option value="PA">PA</option>
			<option value="TN">TN</option>
			<option value="TX">TX</option>
			<option value="UT">UT</option>
			<option value="VT">VT</option>
			<option value="VA">VA</option>
			<option value="WV">WV</option>
			<option value="WA">WA</option>
			<option value="WI">WI</option>
		</select>
		</td>
		<td><button class="btn btn-default" data-update-row>update</button></td>
    </tr>
</div>


<div id="Areas_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide"
     data-params="wd_listar_areas.instance({message: 'Hello world',dataTest: 'dt_reg_area'})">

   <hr class="fs-transparent-25 fs-no-margin-top"/>
      
      <div class="panel panel-primary">
      <div class="panel-heading"><span class="fluigicon fluigicon-tree-view fluigicon-md"></span>&nbsp;Áreas</div>
                  <div class="panel-body">
                  
                        <form role="form">
                            

    <select data-change-selector="" id="select" class="form-control">
    
   		<option value="area" selected>Área</option>
		<option value="categoria_area">Categoria de Área</option>
	
	</select>          

      <fieldset id ="area_${instanceId}">
        <legend>Registro de áreas</legend>
        <div class="form-group">
        <label for="dt_reg_area" class="control-label">Fecha</label>
        <input type="date" class="form-control"name= "dt_reg_area_${instanceId}" id="dt_reg_area_${instanceId}" placeholder="" readonly="">
        </div>
        <div class="form-group">
        <label for="cod_area" class="control-label">Código de área</label>
        <input type="text" class="form-control"name= "cod_area_${instanceId}" id="cod_area_${instanceId}" placeholder="">     
        </div>
        <div class="form-group">
        <label for="nom_area" class="control-label">Nombre</label>
        <input type="text" class="form-control"name= "nom_area_${instanceId}" id="nom_area_${instanceId}" placeholder="">
        </div>
        
        <div class="form-group">
        <label for="tipo_categoria_${instanceId}" class="control-label">Categoria</label>
        <select id="tipo_categoria_${instanceId}" name="tipo_categoria_${instanceId}" class="form-control"></select>	
        </div>

 </fieldset>
  <fieldset id="cat_area_${instanceId}">
<legend>Categoría de área</legend>
<div class="form-group">
        <label for="dt_reg_area" class="control-label">Fecha</label>
        <input type="date" class="form-control"name= "date_reg_cat_area_${instanceId}" id="date_reg_cat_area_${instanceId}" placeholder="" readonly="">
        </div>
        <div class="form-group">
        <label for="cod_area" class="control-label">Descripción de Área</label>
        <input type="text" class="form-control"name= "desc_cat_area_${instanceId}" id="desc_cat_area_${instanceId}" placeholder="">     
        </div>
        
</fieldset>  
                      <div class="bs-example">
		<div class="row">
			<div class="col-md-12" id="target" data-isolated-scroll=""
				style="zoom: 1;">

				<script type="text/template" class="mydatatable-template-row-area-buttons">
					<div id="datatable-area" class="panel-heading">
						<div class="row">
							<div id="datatable-area-action" class="col-md-9">
							<div class="row">
							<div class="col-md-5">
								<button class="btn btn-primary" data-datatable-add-row="">Añadir
								</button>
								</div>
								<div class="col-md-5">
								<button class="btn btn-primary" data-datatable-del-row="">Borrar
								</button>
								</div>
								<div class="col-md-5">
								<button class="btn btn-primary" data-datatable-edit-row="">Editar
								</button>
								</div>
								<div class="col-md-5">
								<div class="btn-group">
									<button type="button" class="btn btn-primary dropdown-toggle"
										data-toggle="dropdown" aria-expanded="false">
										Más
										<span class="caret"></span>
									</button>
									<ul class="dropdown-menu" role="menu">
										
										<li>
											<a data-datatable-reload="" href="#">Recargar</a>
										</li>
										<li>
											<a data-datatable-selected="" href="#">Seleccionado</a>
										</li>
									</ul>
									</div>
								   </div>
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

<script type="text/template" class="template_datatable_edit_cat ">
    <tr id="area-edit" class="{{classSelected}}">
        <td>{{id}}<input type="hidden" value="{{id}}" id="datatable-input-id"></td>
        <td><input type="text" class="datatable-edit form-control" value="{{name}}" id="datatable-input-name"></td>
        
		<td><button class="btn btn-default" data-update-row>update</button></td>
    </tr>
    </script>
    <script type="text/template" class="template_datatable_edit_area ">
    <tr id="area-edit" class="{{classSelected}}">
        <div class="col-md-01"><td>{{id}}<input type="hidden" value="{{id}}" id="datatable-input-id"></td></div>
       <div class="col-md-01"> <td><input type="text" class="datatable-edit form-control" value="{{codigo}}" id="datatable-input-codigo"></td></div>
        
        <div class="col-md-01"><td><input type="text" class="datatable-edit form-control" value="{{name}}" id="datatable-input-name"></td></div>
         <div class="col-md-01"><td>
		<select class="form-control" id="datatable-input-desc-cat">
			<option  value="{{cat_area}}"></option>
		</select>
		</td></div>

	
		<div class="col-md-01">
		<td><button class="btn btn-default" data-update-row>update</button></td>
		</div>
    </tr>
    </script>
   
            </div>
              
                        </form>    
      </div>
  

<script src="/webdesk/vcXMLRPC.js" type="text/javascript"></script>

</div>


var wd_listar_areas = SuperWidget.extend({
	
	myTable: null,
	mydata: [],
	tableData: null,
	DBtime:"ds_time_DB",
	MYDATASET:{categoria:"ds_cat_reg",area:"ds_area_reg"},
	currentDataset:"",
	currentData:null,
	listOptions:null,
	actualRow:null,
	
	bindings: {
		local: {
			'datatable-add-row': ['click_addRow'],
			'datatable-del-row': ['click_delRow'],
			'datatable-edit-row': ['click_editRow'],
			'datatable-show-column': ['click_showColumn'],
			'datatable-hide-column': ['click_hideColumn'],
			'datatable-reload': ['click_reload'],
			'datatable-selected': ['click_selected'],
			'change-selector':['change_selector']
		},
		global: {}
	},

	init: function() {
		var that = this;
		var instance = that.instanceId;
		that.currentDataset=that.MYDATASET.area;
		that.currentData=that.control.area;
		try{
			that.loadTable();
		}catch(error){
			
			alert(error);
		}
		
		$("#dt_reg_area_"+instance).val();
		$("#cat_area_"+instance).hide();
		
		var data=that.getDatasetR(that.MYDATASET.categoria);
		for (var i in data){

			var json=that.listCat(data[i]);
//'id_cat', 'nombre_cat'
$("#tipo_categoria_"+instance).append("<option  value='"+json.id_cat+"'>"+json.nombre_cat+"</option>");
$('[type="text"]').change(function(){$(this).val($(this).val().toUpperCase())});
}
},

control: {
	categoria:{
		fields:[0,1],
		renderContent:['id_cat', 'nombre_cat'],
		header:[{
			'title': 'Id',
			'dataorder': 'DESC',
			'size': 'col-md-1'
		},  {
			'title': 'Nombre',
			'size': 'col-md-7',
			'standard': true
		}],
		hideColumns:[0],
		template:'.template_datatable_edit_cat',


		editedRow : function ()
		{
			var rowToEdit={
				id_cat:$('#datatable-input-id').val(),
				nombre_cat: $('#datatable-input-name').val()

			};
			return rowToEdit;
		},	

		datasetJSON: function (dataset){

			var json={}		
		//'id_cat', 'nombre_cat'
		json.id_cat  =  dataset[0];
		json.nombre_cat= dataset[1];

		return json;
	},
	row: function(instance)
	{
		var that = this;

		var	 nombreActual=$("#desc_cat_area"+"_"+instance).val();
		var row = 
		{

			nombre_cat: nombreActual,

		};
		that.actualRow=row;
		return row;

	},		

	getValues:function(row)
	{
		$('#datatable-input-id').val(row.id_cat);
		$('#datatable-input-name').val(row.nombre_cat);
		return row;
	},

}

,


area:{
	fields:[0,1,2,4],
	renderContent:['id', 'codigo', 'nombre','categoria'],
	header:[{
		'title': 'Id',
		'dataorder': 'DESC',
		'size': 'col-md-1'
	}, {
		'title': 'Código',
		'standard': true,
		'size': 'col-md-4'
	}, {
		'title': 'Nombre',
		'size': 'col-md-4',
		'standard': true
	}, {
		'title': 'Categoria',
		'size': 'col-md-3',
		'standard': true
	}],
	hideColumns:[0,4],
	template:'.template_datatable_edit_area',
	editedRow : function() 
	{
		var rowToEdit={
			id:$('#datatable-input-id').val(),
			codigo: $('#datatable-input-codigo').val(),
			nombre: $('#datatable-input-name').val(),

			categoria:$("#datatable-input-desc-cat").val()
		};
		return rowToEdit;	


	},
	datasetJSON: function(dataset){

		var json={}		
		//'id', 'codigo', 'nombre','descripcion','categoria'
		json.id  =  dataset[0];
		json.codigo= dataset[1];
		json.nombre= dataset[2];
		
		json.categoria= dataset[3];


		return json;
	},
	row: function(instance)
	{
		var that = this;
		var codigoActual=$("#cod_area"+"_"+instance).val(),
		nombreActual=$("#nom_area"+"_"+instance).val(),

		categoria=$("#tipo_categoria"+"_"+instance).val();

		var row = 
		{

			codigo: codigoActual,
			nombre: nombreActual,

			categoria:categoria
		};
		that.actualRow=row;
		return row;
	},
	getValues:function(row)
	{
		$('#datatable-input-id').val(row.id);
		$('#datatable-input-name').val(row.nombre);

		$("#datatable-input-desc-cat").val(row.categoria);

		return row;
	}
}





},
loadTable: function() {

	var that = this;
	var fields=new Array();
	var datasetReturn=that.getDataset();


	var container=[];
	var places=that.currentData.fields;
		//console.log(JSON.stringify(datasetReturn));
		
		if(datasetReturn)
			for (var i in datasetReturn){
				var data=[];
				for (var j in places)
					data.push(datasetReturn[i][places[j]]);

				var json= that.currentData.datasetJSON(data);
			//json.documentId= datasetReturn[i][3];	
			
			container.push(json);
			

		}
		
		$("[type='date']").each(function(){
			var date= new Date();

			var day=parseInt(date.getUTCDate()),
			month= parseInt(date.getMonth())+1;

			if(day<10){

				day="0"+day;
			}

			if(month<10){

				month="0"+month;
			}
			$(this).val(date.getFullYear()+"-"+month+"-"+day);

		});

		that.mydata=container;
		console.log("loadTable (2)"+JSON.stringify(container));
		that.myTable = FLUIGC.datatable('#idtable' + "_" + that.instanceId, {
			dataRequest: that.mydata,
			renderContent: that.currentData.renderContent,
			header:that.currentData.header,
			search: {
				enabled: true,
				onlyEnterkey: true,
				searchAreaStyle: 'col-md-5',
				onSearch: function(res) {
					that.myTable.reload(that.tableData);
					if (res) {
						var data = that.myTable.getData();
						var search = data.filter(function(el) {
							return el.nombre.toUpperCase().indexOf(res.toUpperCase()) >= 0;
						});
						that.myTable.reload(search);
					}
				}
			},
			scroll: {

				target: ".target",
				enabled: true

			},
			actions: {
				enabled: true,
				template: '.mydatatable-template-row-area-buttons',
				actionAreaStyle: 'col-md-6'
			},
			navButtons: {
				enabled: true,
				forwardstyle: 'btn-warning',
				backwardstyle: 'btn-warning',
			},
			draggable: {
				enabled: false
			},
		}, function(err, data) {
			if (err) {
				FLUIGC.toast({
					message: err,
					type: 'danger'
				});
			}
		});

that.myTable.on('fluig.datatable.loadcomplete', function() {
	if (!that.tableData) {
		that.tableData = that.myTable.getData();
	}
});



that.hideColumn();
},

addRow: function(el, ev) {


	var that = this;

		//var dataReturned= that.getDataset();
		// 'descripcion','categoria'
		var row = that.currentData.row(that.instanceId);
		
		
		var flag= true;
		//console.info(row);
		for (var i in row){

			if(row[i].toString().trim()==""){
				flag=false;
			}
		}
		if(flag){
			console.log("ROW"+JSON.stringify(row));
			var respuesta= that.insertCard(row);
			
			if (respuesta[0][1].indexOf("exito")>=0)
			{
				
				
				if(that.currentData.renderContent[0].indexOf("id_cat")>=0)
					row.id_cat=respuesta[0][0];
				else
					row.id=respuesta[0][0];
				
				that.myTable.addRow(0, row);
				
				FLUIGC.toast({
					title: 'Exito',
					message: "¡Registro Guardado!",
					type: 'success'
				});
			}else{

				FLUIGC.toast({
					title: 'ERROR',
					message: "¡Registro duplicado!",
					type: 'warning'
				});
			}
			
		}else
		{
			FLUIGC.toast({
				title: 'ERROR',
				message: "Uno o más campos estan vacios",
				type: 'warning'
			});
		}
		
		$("[type='text'").each(function(){
          $(this).val("");

		});
		
	},

	delRow: function(el, ev) {
		
		var that = this;
		var itemsToRemove = that.myTable.selectedRows();
		var selected = that.myTable.getRow(that.myTable.selectedRows()[0]);
		FLUIGC.message.confirm({
			message: '¿Esta seguro de borrar?',
			title: 'Remover registro',
			labelYes: 'Sí',
			labelNo: 'Cancelar'
		}, function(result, el, ev) {
		    //Callback action executed by the user...
		    if(result){

		    	if (itemsToRemove.length > 0) {
		    		for (var i = 0; i <= itemsToRemove.length; i++) {
		    			that.myTable.removeRow(that.myTable.selectedRows()[0]);
		    		}
		    	}



		    	var index = that.myTable.selectedRows()[0];

		    	var sortingField =new Array("delete");
		    	if(that.currentDataset.indexOf("ds_cat_reg")>=0){

		    		var field=new Array(selected.id_cat);
		    		console.warn(selected.id_cat);
		    	}
		    		else

		    	var field=new Array(selected.id);

		    	var dataset= DatasetFactory.getDataset(that.currentDataset, field,null , sortingField); 
		    	FLUIGC.toast({
		    		title: '',
		    		message: "Elemento borrado" ,
		    		type: 'success'
		    	});

		    }
		    //result: Result chosen by the user...
		    //el: Element (button) clicked...
		    //ev: Event triggered...


		});
		
		

	},

	editRow: function(el, ev) {
		var that = this;
		var row = that.myTable.getRow(that.myTable.selectedRows()[0]);
		that.showColumn();
		
		var classTemplate=that.currentData.template;
		that.myTable.updateRow(that.myTable.selectedRows()[0], row, classTemplate);
		var data= that.currentData.getValues(row);
		
		//$('#datatable-input-uf').val(row.documentId);
		var selectValues= $("#tipo_categoria_"+that.instanceId).html();
		console.log("#tipo_categoria_"+selectValues);
		$('#datatable-input-desc-cat').html(selectValues);
		$('[data-datatable-edit-row]').prop("disabled", true);

		$('[data-update-row]').click(function(e) {
			var editedRow=that.currentData.editedRow();
			

			var response= that.updateCard();
			
		
			if(response["Mensaje"].indexOf("exito")>=0)
			{
				FLUIGC.toast({
				title: '',
				message: "¡Editado!",
				type: 'success'
				
			});
			that.myTable.updateRow(that.myTable.selectedRows()[0], editedRow);
			}
			else
			{

				FLUIGC.toast({
				title: 'ERROR',
				message: "¡Registro no modificado!",
				type: 'warning'
			});

			}



			




			$('[data-datatable-edit-row]').prop("disabled", false);


			that.hideColumn();
		});


	},

	showColumn: function(el, ev) {
		var that = this;
		var index =that.currentData.hideColumns;
		for (var i in index)
			that.myTable.showColumn(index[i]);
	},

	hideColumn: function(el, ev) {
		var that = this;
		var index =that.currentData.hideColumns;
		
		for (var i in index)
			that.myTable.hideColumn(index[i]);
	},

	reload: function(el, ev) {
		var that = this;				
		that.myTable.reload();
	},

	selected: function(el, ev) {

		var that = this;
		var index = that.myTable.selectedRows()[0];
		var selected = that.myTable.getRow(index);
		selected.id 
		FLUIGC.toast({
			title: '',
			message: "{\"id\" :" + selected.id + ", \"name\" :" + selected.codigo + " , \"uf\" :" + selected.nombre +"}",
			type: 'success'
		});

	},
	insertCard: function (dataToinsert){
		var that=this;
		var sortingField=new Array("insert");
		var field= new Array();
		for (var i in dataToinsert){

			field.push(dataToinsert[i]);

		}
		
		var dataset = DatasetFactory.getDataset(that.currentDataset, field,null , sortingField);    
		var tabela =[];
		
		if(dataset)
			for (var x = 0; x < dataset.values.length; x++) {

				var row = dataset.values[x];
//dataset.values[0][0] 
var objectoA=[];

for (var y = 0; y < dataset.columns.length; y++) {
	objectoA.push(row[dataset.columns[y]]);

}
tabela.push(objectoA);
}

		// console.log(JSON.stringify(tabela));
		return tabela;

		
	},
	updateCard:function(){

		var that = this;
		var  array =["update"];
		var sortingfield=that.currentData.editedRow();

		
		
		var field = $.map(sortingfield, function(value, index) {
    return [value];
});

		

		var dataset = DatasetFactory.getDataset(that.currentDataset, field,null , array);    
		

	var tabela=dataset.values[0];
		

		console.log(JSON.stringify(tabela));
		return tabela;


	}
	,

	
	getDataset: function(){

		
		var that= this;
		var sortingField=new Array("read");
		
		var dataset = DatasetFactory.getDataset(that.currentDataset, null,null , sortingField);        

		var tabela =[];
		
		if(dataset.values.length>0){
			for (var x = 0; x < dataset.values.length; x++) {

				var row = dataset.values[x];
//dataset.values[0][0] 
var objectoA=[];

for (var y = 0; y < dataset.columns.length; y++) {
	objectoA.push(row[dataset.columns[y]]);

}
tabela.push(objectoA);

}
}else{

	return null;
}




return tabela;
},
getDatasetR: function(datasetR){

	var sortingField=new Array("read");
	var dataset = DatasetFactory.getDataset(datasetR, null,null , sortingField);        

	var tabela =[];

	for (var x = 0; x < dataset.values.length; x++) {

		var row = dataset.values[x];

		var objectoA=[];

		for (var y = 0; y < dataset.columns.length; y++) {
			objectoA.push(row[dataset.columns[y]]);

		}
		tabela.push(objectoA);
	}

		////console.log(JSON.stringify(tabela));
		return tabela;
	}
	,
	selector:function(el){
		
		var that =this;
		var instance=this.instanceId;
		//area, categoria_area
		var changeValue= $("#select").val();
		var currentP="";
		var data=that.MYDATASET;


		if( changeValue=="area"){
			currentP=data.area;
			that.currentData=that.control.area;
		}
		if(changeValue.indexOf("categoria_area")>=0){

			currentP=data.categoria;
			that.currentData=that.control.categoria;
		}
		that.currentDataset=currentP;
		////console.log(that.currentDataset);
		if($("#select").val()=="area"){
			$("#area_"+instance).show();
			$("#cat_area_"+instance).hide();

		}
		if($("#select").val()=="categoria_area"){
			$("#area_"+instance).hide();
			$("#cat_area_"+instance).show();

		}
		that.mydata=null;
		that.loadTable();
	},
	listCat:function(data){
		var that= this;
		

		var categoria= that.control.categoria;
		var dataset=categoria.datasetJSON(data);

		return dataset;




	}
	
	
});

var Model={
	productoData:null,
	Saldostatus:null,
	productCode:"7502256040063",
	getData:function (dataname, constraints, fields,sortingFields){
console.log(dataname);
		var arrayConstraints = constraints;
		var tabela = [];
		var aux=[];
		var container={};
		var dataset= DatasetFactory.getDataset(dataname, fields, constraints, sortingFields);
		
		if( dataset.columns[0].indexOf("XML")>=0){
			
			var XML= dataset.values[0][dataset.columns[0]],
			xmlDoc= $.parseXML( XML ),
			$xml=$(xmlDoc);
			console.log(XML);
			return $xml;
		}
		for (var i = 0; i < dataset.columns.length; i++) {
			tabela.push( dataset.columns[i]) ;
		}
		container.columnas=tabela;

    //Monta os registros   
    for (var x = 0; x < dataset.values.length; x++) {

    	var row = dataset.values[x];
    	var data=[];
    	for (var y = 0; y < dataset.columns.length; y++) {
    		data.push( row[dataset.columns[y]] ) ;
    	}
    	aux.push(data);
    }
    container.datos=aux;

    return container;

},
setData:function(){},
updateData:function(){},
deleteData:function(){},
datasetContructor:function(){},


XMLLoteValido:function(tamanioLote){

	var that=this,
	DATANAME ="DS_Valida_Saldo",
	CONSTRAINTS =[],
	FIELDS =new Array(that.productCode,""+tamanioLote) ,
	SORTINGFIELDS=null;
	that.productoData=that.getData(DATANAME, CONSTRAINTS, FIELDS,SORTINGFIELDS);
	var productoData=that.productoData;
	return productoData;


},
getProducto:function ( producto)
{

	var that= this,
	DATANAME ="ds_VerificarProducto",
	CONSTRAINTS =[],
	FIELDS =[] ,
	SORTINGFIELDS=null;
	that.productoData=that.getData(DATANAME, CONSTRAINTS, FIELDS,SORTINGFIELDS);
	var productoData=that.productoData;
	return productoData;
},
checkSaldo:function ( Saldo,  Producto){

	var DATANAME= "ds_VerificarProducto",
	CONSTRAINTS ="",
	FIELDS =[],
	SORTINGFIELDS=[];
	CONSTRAINTS(Saldo,Producto);
	that.getData(dataname, constraints, fields);
},

getOp:function(){
	var that=this;
	var dataname="ds_reg_prod";
	var fields=new Array();
	var c1=DatasetFactory.createConstraint("prod_cod_int_number", "7502256040063PG", "7502256040063PG", ConstraintType.MUST);
	var c2=DatasetFactory.createConstraint("metadata#active", "true", "true", ConstraintType.MUST);

	var constraints=new Array(c1,c2);
	var fields=null;
	var sortingFields= null;

	var result= that.getData(dataname, constraints, fields,sortingFields);
	return result;
},
getOPListaProductos:function(){
var that=this;
	var dataname="DS_Lista_Productos";
	var fields=new Array();
	var constraints=null;
	var sortingFields=null;
		var result= that.getData(dataname, constraints, fields,sortingFields);
	return result;
},
getPotencia:function(Lote){
console.log("getPotencia"+Lote);
var that= this,
	DATANAME ="ds_WSPOTENCIA",
	CONSTRAINTS =[],
	FIELDS = new Array(Lote) ,
	SORTINGFIELDS=null;

	var $response=that.getData(DATANAME, CONSTRAINTS, FIELDS,SORTINGFIELDS);
	console.log(that.getData(DATANAME, CONSTRAINTS, FIELDS,SORTINGFIELDS));


var codigo = $response.find("Codigo").attr("Prod");
var res = $response.find("Resultado").text();
var val = $response.find("Valor").text();

var result={ codProd:codigo , aprobacion:res , val:val };
console.warn("Resulta getPotencia");
console.log(result);
	return result;

},
getEstructura:function(Producto,usaSubproducto){
var that= this,
	DATANAME ="DS_WS_ESTRUCTURA",
	CONSTRAINTS =[],
	FIELDS = new Array(Producto,usaSubproducto) ,
	SORTINGFIELDS=null;
var $XML=that.getData(DATANAME, CONSTRAINTS, FIELDS,SORTINGFIELDS);

	return $XML;

}
};


var CONTROLLER={
	
	state:null,

	stateController:function(){

		const INIT=0;
		var that=this;

		var state=this.state;
/*

REVISION=5

CALCULO = 11


*/
		switch(state){
			case 0:
			try{
				var mainNav="navOP";
				that.initDetallesOP();
				that.initListMat();
				that.showNav(mainNav,"field_lista");
				that.showAccordion("collapseAutorizacion");
			}catch(error){
			}
			break;
			case 5:
			console.log("5");
			var mainNav="navOP";
				that.showNav(mainNav,"field_lista");
				that.disableCuadroFirmas();
				Viewer.addModalControl("#aut_orden_produccion_R");
				that.showAccordion("collapseListaMateriales");
			break;
			case 11:
			console.log(11);
				var mainNav="navOP";
				that.showNav(mainNav,"field_calculo");
				that.disableCuadroFirmas();
				that.showAccordion("#collapse2");
				that.calculatePA();
				break;
			default :
			
		}	

	},

	calculatePA:function(){

		var codigo=$("#codigoPA").val();
		console.warn(codigo);
		var idCPA=-1;
		$("[name^=clave_prod___]").each(function(){
			var comparador=$(this).val();
			console.warn("comparador"+comparador);
			if (comparador.indexOf(codigo) >=0){
				var idName= $(this).attr("name");
				console.warn("idName"+idName);

				var idNumber=idName.replace("clave_prod___","");
				idCPA=idNumber;

			}
console.warn($("[name^=clave_prod___]"));

		});
		var lotesCPA=$("#Lote_prod___"+idCPA).val();
		console.log("#Lote_prod___"+idCPA + "lotesCPA"+lotesCPA);
		var loteVigen=$("#Lote_vigen___"+idCPA).val();
		console.log("loteVigen"+lotesCPA);
		var loteCant=$("#Lote_cant___"+idCPA).val();
		var lotesSeparados=lotesCPA;
		var separarVig=loteVigen;
		var separarCant=loteCant;

		var lotesACalcular=[];
		var lote={};
		

		
			
			
				lote.cantidad=Number(separarCant);
				lote.id= lotesSeparados;
				lote.vigencia=separarVig;
				console.warn(lote);

			
			lotesACalcular.push(lote);

		
					/*
			var lotes=[{cantidad:12345,id:"LOTELCDD000001"}];
			calculoPA.realizarCalc(lotes);
			*/
console.log(lotesACalcular);

var resultado=calculoPA.realizarCalc(lotesACalcular);

$("#CPA_lote1").val(lotesACalcular[0].id);
$("#CPA_fec_cadLote1").val(lotesACalcular[0].vigencia);
// var resultado={potencia:potencia,X1:X1,cantidadUsar:cantidadUsar,X2enMg:X2enMg,X2enGr:X2enGr};
$("#CPA_num_valLote1").val(resultado.potencia);

$("CPA1LoteCalculo1").val(resultado.X1);
$("CPA1LoteCalculo2").val(resultado.cantidadUsar);
$("CPA1LoteCalculo3").val(resultado.X2enGr);
	}
	,
	showAccordion:function (href){

		$('a[href="#'+href+'"]').trigger('click');
	

	},
	showNav:function(parent,tabfield){
		var that= this;

		that.setNav(parent,tabfield);



	},
	initDetallesOP:function (){
		var that=this;
		//Model.getOp();
		//validate(Model.Op())

		that.disableCuadroFirmas();
		that.addListenerTamanioLote2();
		
	},
	initListMat:function(){
		
			var columnsOrder=["clave_prod","descripcion_prod","formula_prod","UM_formula"];
			var columnsResponse=[2,3,4,5];
			var lista= Model.getOPListaProductos();
			var listaResultado=lista.datos;
			

				for (var j in listaResultado){
					var row=[];
					for(var i in columnsResponse ){
						
						

						row.push(listaResultado[j][columnsResponse[i]]);


						}
						Viewer.addRowTable("lista_productos",columnsOrder,row);

				}
	},

	showCuadroFirmas:function (){

	},
	disableCuadroFirmas:function (){
		$(".autorizacion").find(".thumbnail").each(function (){
			$(this).removeClass("modal-call");
			$(this).removeClass("btn-default");
			$(this).addClass("btn-primary");			
		});
		try{

			$(".autorizacion").find(".thumbnail").each(function(){



var $searchValue=$(this).find("p[data-result]"),
idValue=$searchValue.attr("data-result");

if(idValue!== undefined && idValue.trim() != ""){

	var value= $("#"+idValue).val();
	if(value){
	$(".modal-body").find(".form-group").addClass("has-success");
				$searchValue.text(value);

			var $tumb=$(this);
		

				var hasValue=$searchValue.attr("data-result");
				if(hasValue!=null){
			$tumb.addClass("alert alert-success");
			$tumb.removeClass("btn btn-default modal-call");

				
			
}
}

		}
		

	});

		}catch(error){
			
		}
		
	},



	
	
	addListenerTamanioLote2:function (){
		var that=this;
		$("#tamanio_lote").on("blur",function(){
			var tam_digitado=$(this).val();
			if(!tam_digitado==""){
				var onload=FLUIGC.loading('body');
				onload.show();
			var xml=Model.getEstructura("7502256040063","N");
				var callLote=verExistencias(xml,"",tam_digitado);
				var respuesta= callLote.esFabricable;
			if(respuesta){
				onload.hide();
				Viewer.mensaje.success("Exito","Existe Saldo suficiente para la producción de "+tam_digitado+" piezas <p><b>Para más detalles revise la lista de materiales</b></p>");
				Viewer.addModalControl("#aut_orden_produccion_E");
				that.addListenerOnChange("#emitio_name1","#tamanio_lote");
/*
				Codigo=clave
				Descripcion=Descripcion
				Formula=Formula
				UM=UM
*/				}else{

				CONTROLLER.disableCuadroFirmas();
				onload.hide();
				var msg="No existe material suficiente para "+tam_digitado+" piezas<p><b>Revise la lista de materiales</b></p>";

			Viewer.mensaje.error("Error",msg);
			

			}

			var datosTabla=callLote.datos;
						var htmlString="";
					const onSuccess="success";
								const onFail="danger";
							var codigo = "";
						for (var i in datosTabla ){
							if(datosTabla[i].codigoPadre!=codigo){
								if(htmlString!=""){
									htmlString+="</table></fieldset>";
								}
								codigo=datosTabla[i].codigoPadre;
						htmlString+="<fieldset><legend> Código Padre: <small>"+codigo+"</small></legend>";
						htmlString+="<table class='table '> <tr>"+
										"<th>Codigo</th>"+
										"<th>Descripción</th>"+
										"<th>Formula</th>"+
										"<th>UM</th>"+
										"<th>Saldo</th>"+
										
										"<th>Calculado</th>"+
										"<th>Lotes</th>"+
										"</tr>";	
							}
							if(datosTabla[i].esSuficiente){

								var classTable=onSuccess;
							}else{
								var classTable=onFail;
							}
							htmlString+="<tr class='"+classTable+"'>";
							htmlString+="<td>"+datosTabla[i].codProducto+"</td>";
							htmlString+="<td>"+datosTabla[i].descProducto+"</td>";
							htmlString+="<td>"+datosTabla[i].formula+"</td>";
				            htmlString+="<td>"+datosTabla[i].UM+"</td>";
				            htmlString+="<td>"+datosTabla[i].saldo+"</td>";
				           
				           
				            htmlString+="<td>"+datosTabla[i].requeridoCalculado+"</td>";
				            htmlString+="<td>";
				            for (var s in datosTabla[i].lotesTotales){
				            	htmlString+="<p>"+datosTabla[i].lotesTotales[s].lote+"</p>";
				            }
				            htmlString+="</td>";
				            
				            htmlString+="</tr>";
						}
							
						
						 htmlString+="</table>";

						  $("#tableListTemp").html(htmlString);
						
			}
			});
	},
	addListenerOnChange:function(idHTML,idLock){

				 this.modalVar.idHTML=idHTML;
				this.modalVar.idLock=idLock;
						

		
		
	},
	setNav:function(parentfield , field){
		$(document).ready(function(){

			$('#'+parentfield).trigger('click');
			$('a[href="#'+field+'"]').trigger('click');

		});
	} ,modalVar:{
		idLock:null,
		idHTML:null,
		lock:function() { 
			
		$(this.idLock).attr("readonly","readonly");
		$(this.idLock).unbind("blur");
	} 



	}

};

var Viewer={

	addModalControl:function (id){
		var $modal=$(id);
		$modal.removeClass("btn-primary");
		$modal.addClass("btn-default");
		$modal.addClass("modal-call");

	},
	addRowTable:function (tablename,order,values){
		wdkAddChild(tablename);
		var counter=$("table").find("[detailname='"+tablename+"']").length-1;
		
		
		for(var i in order){
			$("#"+order[i]+"___"+counter).val(values[i]);
			$("#"+order[i]+"___"+counter).attr("readonly","readonly");
		}
	},
	mensaje:{
		success:function (titulo, mensaje){
			
		 FLUIGC.toast({
        title: titulo,
        message: mensaje,
        type: 'success'
    });
		},
	error:function (titulo, mensaje){

			 FLUIGC.toast({
        title: titulo,
        message: mensaje,
        type: 'warning'
    });
		},
		warning:function (titulo, mensaje){
		},
	}

	
	};
	var calculoPA={
		

			/*
			var lotes=[{cantidad:12345,id:"LOTELCDD000001"}];
			calculoPA.realizarCalc(lotes);
			*/
	cantidadTeorica:{
		relacion:4,
		valoracion:100,
		contenido:7.9745,
		resultadoIdeal:60000
	},
	setRelacion:function(relacion){this.cantidadTeorica.relacion=relacion},
	setValoracion:function(valoracion){this.cantidadTeorica.valoracion=valoracion},
	setContenido:function(contenido){this.cantidadTeorica.contenido=contenido},
	setResultadoIdeal:function(resultadoIdeal){this.cantidadTeorica.resultadoIdeal=resultadoIdeal},

obtenerX1 :  function (  potencia ){

var cantidadT=this.cantidadTeorica.contenido;
var potenciaT=this.cantidadTeorica.valoracion;
var relacion=this.cantidadTeorica.relacion;

var X= Number(potencia/potenciaT) * cantidadT;
return X;
},
obtenerResta:function(X1){
var cantidadT=Number(this.cantidadTeorica.contenido);
var diferencia= Number(-(X1-cantidadT));
var cantUsar=Number(cantidadT+diferencia);

return cantUsar;
},
obtenerCantidad:function(cantidadUsar , cantidadReq){
var relacion=this.cantidadTeorica.relacion;
var cantidadRequerida=(cantidadUsar/relacion)* cantidadReq ;
return cantidadRequerida;
},
conversionGramos:function(mg){
var rsGramos=mg/1000;
return rsGramos;
},
realizarCalc:function(lotesPA){

var cantidadRequerida=this.cantidadTeorica.resultadoIdeal;
var resultado={};

var restante=cantidadRequerida;
var that=this;

for (var i in lotesPA){
	if(restante>0){
		var cantidadLote=lotesPA[i].cantidad;
		
var valores= Model.getPotencia(lotesPA[i].id);

var potencia=valores.val;



var X1=that.obtenerX1(potencia);

var cantidadUsar= that.obtenerResta(X1);
var X2enMg=that.obtenerCantidad(cantidadUsar,cantidadRequerida);
var X2enGr=that.conversionGramos(X2enMg);

var resultado={potencia:potencia,X1:X1,cantidadUsar:cantidadUsar,X2enMg:X2enMg,X2enGr:X2enGr};
restante=X2enMg-cantidadLote;

console.log("X1 "+X1 + "cantidadUsar"+cantidadUsar+"X2enMg"+X2enMg+"X2enGr"+X2enGr);
return resultado;

if(restante>0){
	
}
	}


}
}

};


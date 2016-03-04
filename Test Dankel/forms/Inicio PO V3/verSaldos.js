var decimales=10000;

function verExistencias(XML,producto, requerido,tipoEstructura){

	var $xml=XML;
	var array=[];
	$xml.find("CodSup").each(function(){
		array.push($(this).text() );
	});


	var resultadoFinal=null;
	var checarSaldo={

		producto : "",
		requerido: "",
		
		doc:function(){

			return $xml
		}
		,
		checar:function(producto,requerido,isOA){

			var that=this;
			that.producto = producto;
			that.requerido= requerido;
			var docXML=that.doc();
			that.calculate(docXML,isOA);
        //console.warn(resultadoFinal)

        return resultadoFinal;


    },
    calculateReq:function(formula,requerido){
    	var resultado=0;
    	if(Number(formula)){
    		resultado= formula*requerido;

    	}

    	return resultado;
    },

    calculateLote:function($Lotes ,cantidadReq){

    	var cantidadActual=0;
    	var result=[];
    	$Lotes.each(function(){
    		if(cantidadActual<cantidadReq){
    			var saldoLote=Number($(this).find("SaldoLote").text());
    			var vigencia=Number($(this).find("FechaVigenciaLote").text());
    			cantidadActual+= saldoLote;

    			var loteId=$(this).attr("Num").trim();
    			var object={lote: loteId,saldo:saldoLote,vigencia:vigencia}
    			result.push(object);


    		}


    	});
    	return result;
    },
    calculate:function(docXML,typeProduction){
    	var result=[];
    	var that= this;
    	var isOA=null;

    		if(typeProduction === "N")
    			{
    				console.log("false");
    				isOA= false;
    			}
    			else{
    				isOA= true;
    			}
    		
    		console.log("isOA"+isOA);
    	if(isOA){

    		var result="";
    		var datos=[];
    		var esFabricable=false;
    		console.log("isOA"+typeProduction);
    		docXML.find("Componente").each(function(){
    			console.log("componentes");
    			var $that=$(this);
    			var $padre= $that;

    			var codProducto  = $padre.find("Producto").text(),
    			descProducto = $padre.find("Descripcion").text(),
    			formula      = Number($padre.find("Cantidad").text())/50,
    			UM           = $padre.find("UnidadMedida").text(),
    			saldo        = Number($padre.find("Saldo").text()),
    			codigoPadre  = $padre.find("CodSup").text(),
    			lotes        = $padre.find("Lote"),
    			requerido    = that.requerido,
    			requeridoCalculado = null,
    			lotesTotales        = [];

    			requeridoCalculado = that.calculateReq(formula,requerido);
    			lotesTotales= that.calculateLote(lotes,requeridoCalculado); 
    			var esSuficiente=(saldo>=requeridoCalculado);

    			var container={
    				codProducto:codProducto,
    				descProducto:descProducto,
    				formula:format(formula),
    				UM:UM,
    				saldo:format(saldo),
    				codigoPadre:codigoPadre,
    				requerido:requerido,
    				requeridoCalculado:format(requeridoCalculado),
    				lotesTotales:lotesTotales,
    				esSuficiente:esSuficiente
    			};

    			datos.push(container);

    		});

    		var respuesta ={ esFabricable:false,datos:datos};
    		resultadoFinal=respuesta;
    		return respuesta;

    	}else
    	{
    		var datos=[];
    		var esFabricable=true;

    		docXML.find("Componente").each(function(){

    			var $that=$(this),
    			codProducto=$that.find("Producto").text(),
    			isStructure=false;

    			for(var i in estructura){

    				if( codProducto.indexOf(estructura[i].trim())>=0 || isStructure ){
    					isStructure=true;
    				}
    			}
    			if(!isStructure){
    				var divisor=50;
    				var codProducto  = $that.find("Producto").text(),
    				descProducto = $that.find("Descripcion").text(),
    				formula      = (($that.find("Cantidad").text())/divisor),
    				UM           = $that.find("UnidadMedida").text(),
    				saldo        = (($that.find("Saldo").text())),
    				codigoPadre  = $that.find("CodSup").text(),
    				lotes        = $that.find("Lote"),

    				requerido    = that.requerido,
    				requeridoCalculado = null,

    				lotesTotales        = [];

    				requeridoCalculado = (that.calculateReq(formula,requerido));
    				lotesTotales= that.calculateLote(lotes,requeridoCalculado);

    				var valueSearch=codProducto;


    				var codLista=[];
    				$("[name^='clave_prod___']").each(function(){

    					var value= $(this).val();

    					codLista.push(value);

    				});

    				var id =codLista.indexOf(valueSearch);
    				if(id>=0){
    					var number= id+1;
    					var lotesEnlinea="";
    					var saldoEnLinea="";
    					var vigenciaEnLinea="";
    					for(var i in lotesTotales){
    						lotesEnlinea+= lotesTotales[i].lote+"\n";
    						saldoEnLinea+= lotesTotales[i].saldo+"\n";
    						vigenciaEnLinea+= lotesTotales[i].vigencia+"\n";
    					}
                    //console.warn(lotesEnlinea);
                    $("#Lote_prod___"+number).val(lotesEnlinea);
                    $("#cant_surtida___"+number).val(requeridoCalculado);
                    $("#UM_surtida___"+number).val(UM);
                    $("#Lote_vigen___"+number).val(vigenciaEnLinea);
                    $("#Lote_cant___"+number).val(saldoEnLinea); 


                }
                var esSuficiente=(saldo>=requeridoCalculado);
                if(!esSuficiente)
                	esFabricable=false;

                var container={
                	codProducto:codProducto,
                	descProducto:descProducto,
                	formula:format(formula),
                	UM:UM,
                	saldo:format(saldo),
                	codigoPadre:codigoPadre,
                	requerido:requerido,
                	requeridoCalculado:format(requeridoCalculado),
                	lotesTotales:lotesTotales,
                	esSuficiente:esSuficiente
                };

                datos.push(container);

            }
        });
    		var respuesta ={ esFabricable:esFabricable,datos:datos};
            //console.log(respuesta);
            resultadoFinal=respuesta;
            return respuesta;
        }


		    //

		}

	}
	var estructura=uniq_fast(array);
	$.each(estructura,function(i){
   // $("div").append("<p>"+ estructura[i] +"</p>");
});
	$xml.find("Producto").each(function(){
		var codigoProduct= $(this).text();
	});
//trigger
var isOA=tipoEstructura;
var producto=null;
var requerir=requerido;
try{checarSaldo.checar(producto,requerir,isOA);}catch(error){console.log(error)}

function  uniq_fast(a) {
	var seen = {};
	var out = [];
	var len = a.length;
	var j = 0;
	for(var i = 0; i < len; i++) {
		var item = a[i];
		if(seen[item] !== 1) {
			seen[item] = 1;
			out[j++] = item;
		}
	}
	return out;
}
return resultadoFinal;
}
function format(number){
	var num= Number(number);

	return num.toFixed(5);
}


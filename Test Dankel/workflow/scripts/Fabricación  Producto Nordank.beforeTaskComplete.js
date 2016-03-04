function beforeTaskComplete(colleagueId,nextSequenceId,userList){
	/*
	////////////////////////////
	//colleagueId     Id usuario
	//nextSequenceId  Número actividad Siguiente
	//userList        Listado de personas que continuan actividad
	////////////////////////////
	*/
	
	function print(s){
		log.info("================="+s+"======================");
		}
	function getField(id){
		var s = hAPI.getCardValue(id);
		print(" getValue "+id+" = "+s);
		return s;
		}
	function setField(id,value){
		hAPI.setCardValue(id,value);
		print("setValue "+id+" = "+value);
		}
	function change2formatDate(date){
		var dateMonth=["ENE","FEB","MAR","ABR","MAY","JUN","JUL","AGO","SEP","OCT","NOV","DIC"];

		var value=""+date;
		

		var arrayDate=value.split("/");

			if(arrayDate.length<3){
				log.warn("ERROR  ");
				log.warn("arrayDate menor a 3 "+JSON.stringify(arrayDate));
			}else{

				var dias= arrayDate[0] ;
				var meses=dateMonth.indexOf(arrayDate[1])+1;//se ajusta para que sea en formato 1,2,...,12
				
				if(meses<10){
					meses="0"+meses;
					
				}
				
				var anios= arrayDate[2];
				var result= anios+meses+dias;
				print(result);
				return result;
			}
		
	}
	
	var PESADOYSURTIDO=27;
	var nextActivity=parseInt(nextSequenceId);
	print("beforeTaskComplete");
	if(nextActivity==PESADOYSURTIDO){
	
		try{
			
			var cod_prod=getField("prod");
			var cantidad=getField("tamanio_lote");
			var fecha_emision=getField("fecha_emision_OP");
			var fecha_fabricacion=getField("fecha_fab_OP");
			var fecha_fin =getField("fecha_entrega");
			
			fecha_emision=change2formatDate(fecha_emision);
			fecha_fabricacion=change2formatDate(fecha_fabricacion);
			fecha_fin=change2formatDate(fecha_fin);
			
			var consideraSUB=getField("cons_subes");
			var Service = ServiceManager.getService('WSORDENPRODUCCION');
			var serviceHelper = Service.getBean();
		    var serviceLocator = serviceHelper.instantiate('protheus.WSORDENPRODUCCION');
		    var webservice= serviceLocator.getWSORDENPRODUCCIONSOAP();
		    var response=webservice.ordenproduccion(cod_prod,cantidad,fecha_fabricacion,fecha_fin, fecha_emision,consideraSUB);
		    
		    setField("numero_orden",response);
		    
		    
		} catch(erro) { 
			log.warn(erro);
		}
		
		
	}
	print(response);
	}



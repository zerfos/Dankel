function validateForm(form,customHTML){
	const INICIO        = 4;
	const REVISION      = 5;
	const CALCULO       = 11;
	const VERF_CALCULO  = 13;
	const AUTORIZAR     = 21;
	const PESARYSURTIR  = 27;

	var state= 0;
	var currentState=getValue("WKNumState");
	log.warn("============================ValidateForm V1============================");
	log.warn("============================"+currentState+"============================");
	if(currentState){
		state=Number(getValue("WKNumState"));	
	}	
	switch(state){
	case 0:
	case 4:
		if (form.getValue('emitio_name1') == null||form.getValue('emitio_name1').trim() == ""){
		     throw "<h3> Falta firma de alguien perteneciente a administración </h3>";
		   } 
		break;
	case 5:
		if (form.getValue('reviso_name1') == null||form.getValue('reviso_name1').trim() == ""){
		     throw "El revisor no ha sido confirmado";
		   } 
		  break;

    	case CALCULO:
		if (form.getValue('realizo_name_CPA') == null||form.getValue('realizo_name_CPA').trim() == ""){
		     throw "El realizador no ha sido confirmado ";
		   } 
		  break;
		
	default:
		
	}
	
	
}
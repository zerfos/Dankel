function displayFields(form,customHTML){ 
	
	const REV_OP=5;
	const AUT_OP=13;
	const CALCULO=11;
	

	var state= 0;
	var currentState=getValue("WKNumState");
	if(currentState){
		state=getValue("WKNumState");	
	}

	log.warn("displayFields"+state);
	
	//inicia tag en script
	customHTML.append("<script>"); 

		
var string2HTML='try{CONTROLLER.state='+state+'; CONTROLLER.stateController();}catch(error){console.log(error)}';

log.warn("displayFields string2HTML V2"+string2HTML);

	customHTML.append(string2HTML);
	customHTML.append("</script>");	
	
}
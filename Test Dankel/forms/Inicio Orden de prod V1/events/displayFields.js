
function displayFields(form,customHTML){ 
	
	var state= 0;
	var currentState=getValue("WKNumState");
	if(currentState){
		state=getValue("WKNumState");	
	}

	log.warn("displayFields"+currentState);
	
	//inicia tag en script
	customHTML.append("<script>");
	if(state ==0){

customHTML.append("try{");
customHTML.append("CONTROLLER.state="+state+";");

customHTML.append("CONTROLLER.stateController();");
customHTML.append("}catch(error){console.log(error)}");



	}
	

	customHTML.append("</script>");
	
	
}
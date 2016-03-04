function servicetask13() {
 try {
	 var Service = ServiceManager.getService('WSSTRUCTURE');
	 var serviceHelper = Service.getBean();
  var serviceLocator = serviceHelper.instantiate('protheus.WSSTRUCTURMOD2');
  var webservice= serviceLocator.getWSSTRUCTURMOD2SOAP();
  var estructura=webservice.sal2ESTRUCTURA("7502256040063","S");
  log.info(estructura);  
 } catch(erro) { 
	log.error(erro);
 }
}
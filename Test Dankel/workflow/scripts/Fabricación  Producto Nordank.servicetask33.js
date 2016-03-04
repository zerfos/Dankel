function servicetask33() {
 try {
	 var Service = ServiceManager.getService('WSORDENPRODUCCION');
	 var serviceHelper = Service.getBean();
  //var serviceLocator = serviceHelper.instantiate('classe.locator');
 } catch(erro) { 
	log.error(erro);
 }
}
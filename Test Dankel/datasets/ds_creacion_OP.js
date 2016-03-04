function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
	/*
	 * ========================CREACION DE ORDEN DE PRODUCCION========================
	 * 
	 * */
	/*
	 *  PARAMETROS 
	        <urn:C2_PRODUTO>?</urn:C2_PRODUTO>
	         <urn:C2_QUANT>?</urn:C2_QUANT>
	         <urn:C2_DATPRI>?</urn:C2_DATPRI>
	         <urn:C2_DATPRF>?</urn:C2_DATPRF>
	         <urn:C2_EMISSAO>?</urn:C2_EMISSAO>
	         <urn:CONSIDSUBSTRUCT></urn:CONSIDSUBSTRUCT>
	 * 
	 */
	 var dataset = DatasetBuilder.newDataset();
	//////////////////////////////////// PARAMETROS WS //////////////////////////////////
	if(fields){
		 var producto=fields[0];
			var cantidad=fields[1];  
			var consideraSub=fields[2]; // S o N
			
			var datepri=fields[3];  //date
			var datPRF=fields[4];  //date
			var emision=fields[5];  //date 20160430
	}
	//////////////////////////////////// -FIN PARAMETROS WS ///////////////////////////////
	 var service = ServiceManager.getService('WSORDENPRODUCCION').getBean();
	 var mtproductionorder = service.instantiate('protheus.WSORDENPRODUCCION');
	 var webservice = mtproductionorder.getWSORDENPRODUCCIONSOAP();
	 try{
		 var response=webservice.ordenproduccion(producto,cantidad,datepri,datPRF,emision,consideraSub);
		 dataset.addColumn("XML");
		 dataset.addRow(new Array(response));
		 
	 }
	 catch(error){
		 
		 dataset.addColumn("ERROR");
		 dataset.addRow(new Array(error));
		 
	 }
	  return dataset;


}function onMobileSync(user) {

}
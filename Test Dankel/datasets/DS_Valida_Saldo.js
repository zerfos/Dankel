
function createDataset(fields, constraints, sortFields) {
	 var dataset =  DatasetBuilder.newDataset();
	//var producto=fields[0],saldo=fields[1];
	var producto=fields[0],saldo=fields[1];
	//URL : http://10.195.34.30:1302/ws/WSSTRUCTURMOD3.apw?WSDL
	  var service = ServiceManager.getService('WS_Verificar_Saldo').getBean();
	  var mtproductionorder = service.instantiate('protheus.WSSTRUCTURMOD3');
	  try{
	    var webservice = mtproductionorder.getWSSTRUCTURMOD3SOAP();
	    var resultXML=webservice.sal3ESTRUCTURA(producto,saldo);
	  }catch(error){log.info("error"+error)}
	    log.info("resultXML "+resultXML);
	
	  dataset.addColumn("ResponseXML");
	    dataset.addRow(new Array(resultXML));
	   return dataset; 		
	    		
	    		
}
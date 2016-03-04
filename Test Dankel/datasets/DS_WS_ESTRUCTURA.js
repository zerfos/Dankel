function defineStructure() {
addColumn("Response");
//addColumn("Codigos");
}
function onSync(lastSyncDate) {
log.info("------->>>>>>"+lastSyncDate);
var dataset=  DatasetBuilder.newDataset();
dataset.addColumn("Reponse");
//   dataset.addColumn("Codigos");
var service = ServiceManager.getService('WSEstructura').getBean();
    var mtproductionorder = service.instantiate('protheus.WSSTRUCTURMOD2');
    var webservice = mtproductionorder.getWSSTRUCTURMOD2SOAP();

    var product=""+webservice.sal2ESTRUCTURA("7502256040063","N");
    var result = "";
    try {
    	
result= product.replace('<?xml version="1.0" encoding="UTF-8"?>',"");

    	
    dataset.addRow(new Array("NOVE"));
    var NewDataSet = new XML(result);
    for (var i = 0; i < NewDataSet.Lotes.length; i++) {
        var element = NewDataSet.Lotes[i];
        console.warn(element.Lote[0]);
        dataset.addRow(new Array(element.Lote[0]+""));
    }
  // var NewDataSet = new XML(result);
    
  
    } catch(erro) {
     
	 log.warn("=============="+erro+"==============");
	    dataset.addRow(new Array(erro));
    }
   
    


    return dataset;
}
function createDataset(fields, constraints, sortFields) {
	
log.warn("===========================================================");
	var dataset=  DatasetBuilder.newDataset();
	dataset.addColumn("XML");
//  dataset.addColumn("Codigos");
	var producto=fields[0];
	var esSubestructura=fields[1];
var service = ServiceManager.getService('WSSTRUCTURE').getBean();
   var mtproductionorder = service.instantiate('protheus.WSSTRUCTURMOD2');
   var webservice = mtproductionorder.getWSSTRUCTURMOD2SOAP();

   var product=webservice.sal2ESTRUCTURA(producto,esSubestructura);
   var result = "";
   try {
   	


   	
   dataset.addRow(new Array(product));

 // var NewDataSet = new XML(result);
   
 
   } catch(erro) {
    
	 log.warn("=============="+erro+"==============");
	    dataset.addRow(new Array(erro));
   }
  
   


   return dataset;
}
	

function onMobileSync(user) {
	
	   var sortingFields = new Array();
	    var constraintTitulo1 = null;
	    var constraints = new Array(constraintTitulo1);
	         	
	    var colunastitulo = new Array('Response');
	    var result = {
	        'fields' : colunastitulo,
	        'constraints' : constraints,
	        'sortingFields' : sortingFields
	    };
	    return result;

}
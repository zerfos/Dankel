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

    var product=""+webservice.sal2ESTRUCTURA("7502256040063");
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
	var url = new java.net.URL("http://www.w3schools.com/xml/cd_catalog.xml");
var connection = url.openConnection();
connection.setRequestMethod("GET");
connection.setRequestProperty("Accept", "text/plain");
if (connection.getResponseCode() != 200) {
    throw "Failed : HTTP error code : " + connection.getResponseCode();
}
log.warn(connection.getInputStream());
var br = new java.io.BufferedReader(new java.io.InputStreamReader(connection.getInputStream()));
log.warn(br);
var result = "";
while ((output = br.readLine()) != null) {
    // Removendo cabeçalhos e comentários iniciais do xml exemplo
    if (output.indexOf("<?") > -1 || output.indexOf("<!") > -1) {
        continue;
    }
    result += output;
}
log.warn(result);
var doc = new XML(result);
log.info("Foram encontrados " + doc.CD.length() + " discos no XML");
 // Fazendo a leitura de todos os CDs que vieram no xml
 for (y in doc.CD) {
    // Exibindo uma propriedade de um dos itens do xml
    log.info("Nome do disco: " + doc.CD[y].TITLE);
    // inserindo novo campo que conterá o valor do campo price convertido para o preco em real
    doc.CD[y].VALORBRL = "R$ " + (doc.CD[y].PRICE * 2);
 
    // Removendo campo Year do xml
  
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
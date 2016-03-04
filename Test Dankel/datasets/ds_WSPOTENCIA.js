function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
 	//PARAMETROS ENTRADA
	
 		var LOTE= fields[0].trim();
 		
 	////////////////////////////	
 		
 	var dataset = DatasetBuilder.newDataset();
 	
 	var service = ServiceManager.getService('WSPOTENCIA').getBean();
 	var potencia = service.instantiate('protheus.WSRESULTQIE');
 	var webservice = potencia.getWSRESULTQIESOAP();
 	    //Parametros de WS
 	    /*
 	     <urn:FOLIO></urn:FOLIO>
         <urn:SERIE></urn:SERIE>
         <urn:PROVEEDOR></urn:PROVEEDOR>
         <urn:TIENDA></urn:TIENDA>
         <urn:PRODUCTO></urn:PRODUCTO>
         <urn:LOTE></urn:LOTE>
         */
 	try{
 		//SOLO SE USA LOTE
         var resultado= webservice.metresult("","","","","",LOTE);
         dataset.addColumn("XML");
         log.info(resultado);
         dataset.addRow(new Array(resultado));
         
         
}catch(error){
	dataset.addColumn("ERROR");
	dataset.addRow(new Array(error.toString()));
 		log.info(error.toString());
 		
 	}
         	return dataset;
    //Ejemplo de resultado
/*
<?xml version="1.0" encoding="UTF-8"?>
<Resultados>
<Codigo Prod= "1161-01-00003-00"><Descripcion>BITARTRATO DE NOREPINEFRINA</Descripcion>
<Lote>LOTELCDD000001                 </Lote>
<Ensayo>VALPA   </Ensayo>
<DescriEnsayo>VALORACION DE PRINCIPIO ACTIVO          </DescriEnsayo>
<Resultado>A</Resultado>
<Valor>98.00</Valor>
</Codigo></Resultados>

*/


}function onMobileSync(user) {

}
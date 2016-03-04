function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
	
	log.info("==========================DS_LISTA_PROD=========================");
	log.info("==========================CONSTRAINT=========================");
	try{
		log.info("======================"+constraints[0]+"=============");
		log.info("======================"+constraints[0][0]+"=============");
	}catch(error){
		
		log.info("=========ERROR CONSTRAINTS========");
	}
	
var dataset = DatasetBuilder.newDataset();
dataset.addColumn("NumFormulario");
dataset.addColumn("Id");
dataset.addColumn("Codigo");
dataset.addColumn("Descripcion");
dataset.addColumn("Formula");
dataset.addColumn("Unidad_de_Medida");
dataset.addColumn("Nota");

var cst = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
var constraints = new Array(cst);
 
var datasetPrincipal = DatasetFactory.getDataset("ds_reg_prod", null, constraints, null);
 
for (var i = 0; i < datasetPrincipal.rowsCount; i++) {
    var documentId = datasetPrincipal.getValue(i, "metadata#id");
    var documentVersion = datasetPrincipal.getValue(i, "metadata#version");
     
    //Cria as constraints para buscar os campos filhos, passando o tablename, número da formulário e versão
    var c1 = DatasetFactory.createConstraint("tablename", "registro" ,"registro", ConstraintType.MUST);
    var c2 = DatasetFactory.createConstraint("metadata#id", documentId, documentId, ConstraintType.MUST);
    var c3 = DatasetFactory.createConstraint("metadata#version", documentVersion, documentVersion, ConstraintType.MUST);
    var constraintsFilhos = new Array(c1, c2, c3);

    //Busca o dataset
    var datasetFilhos = DatasetFactory.getDataset("ds_reg_prod", null, constraintsFilhos, null);

    for (var j = 0; j < datasetFilhos.rowsCount; j++) {
        //Adiciona os valores nas colunas respectivamente.
        dataset.addRow(new Array(
                documentId,
                datasetFilhos.getValue(j, "wdk_sequence_id"),
                datasetFilhos.getValue(j, "id_clave_mat"), 
                datasetFilhos.getValue(j, "desc_mat"),
                datasetFilhos.getValue(j, "formu_text"),
                datasetFilhos.getValue(j, "UM_text"),
                datasetFilhos.getValue(j, "nota_text")));
    }
}
 
return dataset;
}
function onMobileSync(user) {

}
function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {

	
	var periodicService = ServiceManager.getService('Autenticacion');
	var serviceHelper = periodicService.getBean();
	var serviceLocator = serviceHelper.instantiate('com.totvs.technology.ecm.foundation.ws.ECMColleagueServiceService');
	var service = serviceLocator.getColleagueServicePort();

	const grupo  =  fields[0];
	const user= fields[1];
	const password=  fields[2];

	
	var datast= DatasetBuilder.newDataset();

	datast.addColumn("Usuario");
	datast.addColumn("Nombre");
	datast.addColumn("Respuesta");

	var constraints=null;
	if(grupo){
		var c1 = DatasetFactory.createConstraint("colleagueGroupPK.groupId", grupo , grupo, ConstraintType.MUST);
		var c2 = DatasetFactory.createConstraint("colleagueGroupPK.colleagueId", user , user, ConstraintType.MUST);
	
		 constraints=new Array(c1,c2);
	}
	
	


	var isUserGroup = DatasetFactory.getDataset("colleagueGroup",null , constraints, null);
	if(isUserGroup.values.length>0){	
		try{
		var camposUsuario=new Array("colleagueName","login");
		
		
		var c12 = DatasetFactory.createConstraint("login", user , user, ConstraintType.MUST);
		var constraints1=new Array(c12);
	
		var dataset = DatasetFactory.getDataset("colleague",null,constraints1,null);
		var name="";
		for (var j = 0; j < dataset.rowsCount; j++) {
           
            
                   
          name= dataset.getValue(j, "colleagueName");
		}
       
			var log=user;
			var pass=password;
			
			var validar= service.validateColleagueLogin("1",log,pass);
		datast.addRow(new Array(log,validar,name));
		}catch(error){
			
			//datast.addRow(new Array("","",error.toString()));
			
		}
	}
		return datast;

}function onMobileSync(user) {

}
function createDataset(fields, constraints, sortFields) {

	
	var periodicService = ServiceManager.getService('Autenticacion');
	var serviceHelper = periodicService.getBean();
	var serviceLocator = serviceHelper.instantiate('com.totvs.technology.ecm.foundation.ws.ECMColleagueServiceService');
	var service = serviceLocator.getColleagueServicePort();

	const grupo  =  fields[0];
	const password= fields[1];

	
	var datast= DatasetBuilder.newDataset();

	datast.addColumn("Usuario");
	datast.addColumn("Nombre");
	datast.addColumn("Respuesta");

	if(grupo)
	var c1 = DatasetFactory.createConstraint("colleagueGroupPK.groupId", grupo , grupo, ConstraintType.MUST);
	var constraints=new Array(c1);
	var campo=new Array("colleagueGroupPK.colleagueId","colleagueGroupPK.groupId");


	var usersGroup = DatasetFactory.getDataset("colleagueGroup",campo , constraints, null);

	
	var camposUsuario=new Array("login","colleaguePK.colleagueId","colleagueName");

	var usuarios=[];
	for(var i =0; i< usersGroup.rowsCount;i++){
		var user = usersGroup.getValue(i,"colleagueGroupPK.colleagueId");
		var userConstraint= DatasetFactory.createConstraint("colleaguePK.colleagueId", user , user, ConstraintType.SHOULD);
		usuarios.push(userConstraint);
	}
	


	
	var loginDataset = DatasetFactory.getDataset("colleague",null , usuarios, null);

	for(var i =0;i< loginDataset.rowsCount ;i++)
	{
		try{
			var login=loginDataset.getValue(i,"login");
			var name=loginDataset.getValue(i,"colleagueName");
			autenticacion(login,name);
			
		}catch(err){
			
			//datast.addRow(new Array(err,""));
		}
		

	}
	






		

	function autenticacion(login,name){
		var validar=password;

		try{ 
			var log=login.toString();
			var pass=password.toString();
			validar=service.validateColleagueLogin("1",log,pass);
		datast.addRow(new Array(login,validar,name));
		}catch(err){}

		
	}



	return datast;



}
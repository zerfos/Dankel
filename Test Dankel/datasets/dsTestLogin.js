function createDataset(fields, constraints, sortFields) {
	var datast= DatasetBuilder.newDataset();
	datast.addColumn("Usuario");
	datast.addColumn("Respuesta");
	var password=0;

	var arreglo=[];
	var user1= DatasetFactory.createConstraint("colleaguePK.colleagueId", "jorge.robledo" , "jorge.robledo",ConstraintType.MUST);
	arreglo.push(user1);
	var usuarios=new Array(user1);
	
	var loginDataset = DatasetFactory.getDataset("colleague",null , arreglo, null);

	for(var i =0;i< loginDataset.rowsCount ;i++)
	{
		try{
			var login=loginDataset.getValue(i,"login");
			datast.addRow(new Array(login ,password));
			
		}catch(error){}
		

	}
    
    return datast;
    
    
    
    
}
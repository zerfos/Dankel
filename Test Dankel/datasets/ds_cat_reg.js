function createDataset(fields, constraints, sortFields) {

		//VARIABLES GLOBALES//
	    const datatable="Categoria_Area" ;
	    var minhaQuery="";
	    //FIN VARIABLES GLOBALES//
	    var constraints=""+sortFields[0];
	    
	    switch(constraints){
	    case "insert":
	    	minhaQuery="EXEC InsertCatArea @desc_cat_area  = N'"+fields[0]+"'";
	    	
	    	break;
	    case "read":
	    	minhaQuery="SELECT id_cat_area,desc_cat_area FROM Categoria_Area";
	    	break;
	    case "delete":
	    	minhaQuery="DELETE FROM "+datatable+" WHERE id_cat_area="+fields[0];
	    	break;
	    case "update":
	    	minhaQuery="EXEC UpdateCatArea @id_cat_area= "+fields[0]+" ,@desc_cat_area  = '"+fields[1]+"'";
	    default : 
	    	error();
	    }
	    log.warn(minhaQuery);
	   /*
	    *********** Values in categoria_Area desc_cat_area,date_reg_cat_area  ***************
	    */
	//	var minhaQuery = "INSERT INTO Categoria_Area(desc_cat_area,date_reg_cat_area) VALUES('',(SELECT GETDATE()) )";
    //  var minhaQuery ="Select * FROM Categoria_Area";
		var dataSource = "jdbc/6QBH0T_DANKEL_FLG_PRB";
		

		var newDataset = DatasetBuilder.newDataset();
		var ic = new javax.naming.InitialContext();
		var ds = ic.lookup(dataSource);
		var created = false;
		
		function returnValue(){
			
			if(constraints.indexOf("read")>=0){
				
				return true;
			}
			
			return false;
		}
		function isUpdate(){
			
			if(constraints.indexOf("update")>=0){
				
				return true;
			}
			
			return false;
		}
		
function isInsert(){
			
			if(constraints.indexOf("insert")>=0){
				
				return true;
			}
			
			return false;
		}
function isDelete(){
	
	if(constraints.indexOf("delete")>=0){
		
		return true;
	}
	
	return false;
}
		try {
			 var conn = ds.getConnection();
			 var stmt = conn.createStatement();
			 if(returnValue()||isInsert()||isUpdate()){
			 var rs = stmt.executeQuery(minhaQuery);
			 var columnCount = rs.getMetaData().getColumnCount();
			 }else
				 if(isDelete())
					 {
					 
					 var rs = stmt.executeUpdate(minhaQuery);
					 newDataset.addColumn("Response");
					 newDataset.addRow(new Array(""+rs));
					 }
				
			
			 if(returnValue()||isInsert()||isUpdate()){
				 while(rs.next()) {
						if(!created) {
							   for(var i=1;i<=columnCount; i++) {
									  newDataset.addColumn(rs.getMetaData().getColumnName(i));
							   }
							   created = true;
						}
						var Arr = new Array();
						for(var i=1;i<=columnCount; i++) {
							   var obj = rs.getObject(rs.getMetaData().getColumnName(i));
							   if(null!=obj){
									  Arr[i-1] = rs.getObject(rs.getMetaData().getColumnName(i)).toString();
									  log.info( "LOG ===================" + rs );
									  log.info( "LOG ===================" + rs.getMetaData().getColumnName(i) );

							   }else {
									  Arr[i-1] = "null";
							   }
						}
						newDataset.addRow(Arr);
				 }
			 }
			
		} catch(e) {
			 log.error("ERRO==============> " + e.message);
		} finally {
			 if(stmt != null) stmt.close();
			 if(conn != null) conn.close();          
		}
		
		
		
		return newDataset;
	}
	
	
function error(){
	
	
	
	
}					
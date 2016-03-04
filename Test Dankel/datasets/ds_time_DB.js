function createDataset(fields, constraints, sortFields) {
	var constraints="read";
	 var minhaQuery="SELECT GETDATE() FROM Categoria_Area";
	   
	   //values in categoria_Area desc_cat_area,date_reg_cat_area
	    
	//	var minhaQuery = "INSERT INTO Categoria_Area(desc_cat_area,date_reg_cat_area) VALUES('',(SELECT GETDATE()) )";
 //  var minhaQuery ="Select * FROM Categoria_Area";
		var dataSource = "jdbc/6QBH0T_DANKEL_FLG_PRB";
		

		var newDataset = DatasetBuilder.newDataset();
		var ic = new javax.naming.InitialContext();
		var ds = ic.lookup(dataSource);
		var created = false;
		try {
			 var conn = ds.getConnection();
			 var stmt = conn.createStatement();
			 if(constraints=="read"){
			 var rs = stmt.executeQuery(minhaQuery);
			 var columnCount = rs.getMetaData().getColumnCount();
			 }else
				 var rs = stmt.execute(minhaQuery);
			
			 if(constraints=="read"){
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
	
function createDataset(fields, constraints, sortFields) {


	
	
		for(var i in sortFields)
			{
				log.info(sortFields[i]);
			}
		var minhaQuery = "SELECT * FROM Categoria_Area";

		var dataSource = "jdbc/6QBH0T_DANKEL_FLG_PRB";
		

		var newDataset = DatasetBuilder.newDataset();
		var ic = new javax.naming.InitialContext();
		var ds = ic.lookup(dataSource);
		var created = false;
		try {
			 var conn = ds.getConnection();
			 var stmt = conn.createStatement();
			 var rs = stmt.executeQuery(minhaQuery);
			 var columnCount = rs.getMetaData().getColumnCount();
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
		} catch(e) {
			 log.error("ERRO==============> " + e.message);
		} finally {
			 if(stmt != null) stmt.close();
			 if(conn != null) conn.close();          
		}
		
		
		
		return newDataset;
	}
	
	

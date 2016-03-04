function createDataset(fields, constraints, sortFields) {

///////////////////////// INSERT INTO AREA  ///////////////////////////////////////////////////////////
	/*
	 *    //////////fields as values////////////////////
	 *    
	 *  0 nom_area
	 *	1 desc_area
     *	2 date_reg_area
	 *	3 fk_id_cat_area_Cat_Area
	 *
	 *   ///////////////////////////
	 */
	
		var minhaQuery = "Insert into Area (nom_area,desc_area,status_area,date_reg_area,fk_id_cat_area_Cat_Area ) VALUES ("+fields['nombre']+","+fields['desc']+","+"1"+","+"(SELECT GETDATE())"+","+fields['categoria']+")";
		// var minhaQuery="SELECT * FROM Area";
		var insertInto="";
		for(var i in fields)
		{
			log.info(fields[i]);
		}
		var dataSource = "jdbc/6QBH0T_DANKEL_FLG_PRB";
		

		var newDataset = DatasetBuilder.newDataset();
		var ic = new javax.naming.InitialContext();
		var ds = ic.lookup(dataSource);
		var created = false;
		try {
			 var conn = ds.getConnection();
			 var stmt = conn.createStatement();
			 var rs = stmt.execute(minhaQuery);
			 newDataset.addColumn("Message");
			 newDataset.addRow(new Array(rs.toString()));

		} catch(e) {
			 log.error("ERRO==============> " + e.message);
			 newDataset.addColumn("Message");
			 newDataset.addRow(new Array(e.message));
		} finally {
			 if(stmt != null) stmt.close();
			 if(conn != null) conn.close();          
		}
		
		
		
		return newDataset;
	}
	
	

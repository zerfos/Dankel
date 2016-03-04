function createDataset(fields, constraints, sortFields) {

	  
	
		    var dataset = DatasetBuilder.newDataset();
		        
		     //Cria as colunas
		     dataset.addColumn("Codigo");
		     dataset.addColumn("Nombre");
		     
		       
		     //Cria os registros
		     
		     dataset.addRow(new Array("COR-ACO-01","Pasillo"));
		     dataset.addRow(new Array("COR-ACO-02","Pasillo 1 de acondicionamiento"));
		     dataset.addRow(new Array("COR-ACO-03","Pasillo 2 de acondicionamiento"));
		     dataset.addRow(new Array("COR-ACO-04","Pasillo 3 de acondicionamiento"));
		     dataset.addRow(new Array("COR-BAÑ-04","Baños de acondicionamiento"));
		     dataset.addRow(new Array("COR-BAL-01","Pesadas de acondicionamiento"));
		     dataset.addRow(new Array("COR-DES-01","Descarga de autoclave"));
		     dataset.addRow(new Array("COR-ETQ-01","Etiquetado"));
		     dataset.addRow(new Array("COR-ETQ-02","Esclusa de personal"));
		     dataset.addRow(new Array("COR-ETQ-03","Órdenes surtidas de acondicionamiento"));
		     dataset.addRow(new Array("COR-LIM-01","Línea Manual"));
		     dataset.addRow(new Array("COR-LIM-02","Esclusa de personal"));
		     dataset.addRow(new Array("COR-LIM-03","Órdenes surtidas de acondicionamiento"));
		     dataset.addRow(new Array("COR-LIN-01","Línea de inspección"));
		     dataset.addRow(new Array("COR-LIQ-04","Esclusa de personal"));
		     dataset.addRow(new Array("COR-LIQ-05","Órdenes surtidas de acondicionamiento"));
		     dataset.addRow(new Array("COR-LIQ-06","Línea de acondicionamiento 2"));
		     dataset.addRow(new Array("COR-LOR-03","Línea de acondicionamiento 4"));
		     dataset.addRow(new Array("COR-LOR-04","Órdenes surtidas de acondicionamiento"));
		     dataset.addRow(new Array("COR-LOR-05","Esclusa de personal"));
		     dataset.addRow(new Array("COR-SEM-03","línea de acondicionamiento 3"));
		     dataset.addRow(new Array("COR-SEM-04","Esclusa de personal"));
		     dataset.addRow(new Array("COR-SEM-05","Órdenes surtidas de acondicionamiento"));
		     dataset.addRow(new Array("COR-SOL-14","Órdenes surtidas de acondicionamiento"));
		     dataset.addRow(new Array("COR-SOL-15","Esclusa de personal"));
		     dataset.addRow(new Array("COR-SOL-16","Línea de acondicionamiento 5"));
		     dataset.addRow(new Array("COR-SUP-01","Supervisión de acondicionamiento"));
		     dataset.addRow(new Array("COR-ZTR-03","Zona de transferencia de acondicionamiento 1"));
		     dataset.addRow(new Array("COR-ZTR-04","Zona de transferencia de acondicionamiento 2"));
		     
		      
		     return dataset;
		 }
	

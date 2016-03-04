var cntrlTable={
init:function($table,limit,$button){
cntrlTable.limit=limit;
var tableRows=$table.find("tr").length;
if(cntrlTable.cntrlEvents(tableRows))
{

	var $last=$table.find("tr").last();
	cntrlTable.readValues($last);
}


},
limit:0,
cntrlEvents:function(countRow){

if(countRow>=cntrlTable.limit){

	return false;

}

return true;

},

readValues:function($row){
$row.find("input").each(function(){

var response=cntrlTable.tableHelper.filterType($(this));
$(this).val(response);

	});


}
,
crearRegistro:function($button){
//Crea nuevo registro

$button.trigger("click");

},
tableHelper:{


	filterType:function($row){
	var tipo=$row.attr("data-type");
	var respuesta="";
	
	switch(tipo){

	case "contador":
	respuesta=$row.attr("id").split("___")[1];
	break;
	case "fecha":
	console.log("fecha");

	break;
	case "hora":
	console.log("hora");

	break;

	}

return respuesta;
},

	rowActive:function ($tableRow){

		var $inputs=$tableRow.find("input");


		return $inputs;
	}


}



}

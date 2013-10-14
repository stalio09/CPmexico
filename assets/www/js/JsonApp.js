// alert dialog dismissed
function alertDismissed() {
    // do something
}
// Show a custom alert
function showAlert(msg,title,btname,callback) {
    navigator.notification.alert(
    msg,  // message
    callback,         // callback
    title,            // title
    btname                  // button Name
);
}

function jsonp(urldir,dat,jsonpCallbackFunction,succesFunction,errorFunction){
	$.ajax({
        url: urldir,
        data: dat,
        dataType: 'jsonp',
        jsonp: 'callback',
        jsonpCallback: jsonpCallbackFunction,
        success: succesFunction,
        error: errorFunction
    });
}

function complete(data)
{
	showAlert(data,'Error','Aceptar',alertDismissed);
}
function faild(data)
{
	showAlert(data,'Error','Aceptar',alertDismissed);
}

function jsonpCallbackC(data)
{
	$("#movie-table tbody").empty();
	for(i in data.resp)
	{
		
		//$('#list').append('<li>'+data.resp[i].d_codigo+'\n Asentamiento: '+data.resp[i].d_asenta+',  Estado:'+data.resp[i].d_estado+'</li>');
		$('#movie-table').append('<tr>'	+'<td>'+data.resp[i].d_codigo+'</td>'+'<td>'+data.resp[i].d_asenta+'</td>'+'<td>'+data.resp[i].D_mnpio+'</td>'+'<td>'+data.resp[i].d_estado+'</td>'+
		'</tr>');
	}
	$.mobile.changePage("#lista");
	    //console.log(data.resp[i].d_codigo)

}

function jsonpCallbackB(data)
{
	$("#movie-table tbody").empty();
	for(i in data.resp)
	{
		
		//$('#list').append('<li>'+data.resp[i].d_codigo+'\n Asentamiento: '+data.resp[i].d_asenta+', Municipio: '+data.resp[i].D_mnpio+'</li>');
		$('#movie-table').append('<tr>'	+'<td>'+data.resp[i].d_codigo+'</td>'+'<td>'+data.resp[i].d_asenta+'</td>'+'<td>'+data.resp[i].D_mnpio+'</td>'+'<td>'+data.resp[i].d_estado+'</td>'+
				'</tr>');
	}
	$.mobile.changePage("#lista");
}

$(document).ready(function() {
  // Handler for .ready() called.
	
	//document.addEventListener("deviceready", onDeviceReady, false);

	//controla el submit del login
	$('#consulta').submit(function(){
		var datoCP = $("#cp").val();
	
		if(datoCP =="")
		{
			showAlert('El campo Código postal es requerido','Alerta','Aceptar',alertDismissed);
			return false;
		}
		else
		{
			var params = {cp:datoCP,fun:1,pkey:'123'};	
			jsonp('http://localhost/appCP/api.php',params,'jsonpCallbackC','complete','faild');
		}
		
	    return false;
	});
	
	
	$('#busqueda').submit(function(){
		var datoColonia = $("#colonia").val();
		var datoEdo = $("#estado").val();
		if(datoColonia =="")
		{
			showAlert('El campo Población/Colonia es requerido','Alerta','Aceptar',alertDismissed);
			return false;
		}
		else
		{
			var params = {colonia:datoColonia,estado:datoEdo,fun:2,pkey:'123'};	
			jsonp('http://localhost/appCP/api.php',params,'jsonpCallbackB','complete','faild');
		}
			  
	    return false;
	});
	
	
});
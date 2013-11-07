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
        //success: succesFunction,
        error: errorFunction
    });
}

function complete(data)
{
	showAlert(data,'Alerta','Aceptar',alertDismissed);
}
function faild(data)
{
	showAlert(data,'Error','Aceptar',alertDismissed);
}

function jsonpCallbackC(data)
{
	$("#movie-table tbody").empty();
	if(data.resp == '')
	{
		showAlert('No se encontraron resultados.','Alerta','Aceptar',alertDismissed);
	}
	else
	{
		for(i in data.resp)
		{
			$('#movie-table').append('<tr>'	+'<td  style="background-color:#6FACD5;color:#ffffff;">'+data.resp[i].d_codigo+'</td>'+'<td>'+data.resp[i].d_asenta+'</td>'+'<td>'+data.resp[i].d_tipo_asenta+'<td>'+data.resp[i].D_mnpio+'</td>'+'<td>'+data.resp[i].d_estado+'</td>'+
			'</tr>');
		}
		$.mobile.changePage("#lista");
	}   

}

function jsonpCallbackB(data)
{
	$("#movie-table tbody").empty();
	if(data.resp == '')
	{
		showAlert('No se encontraron resultados.','Alerta','Aceptar',alertDismissed);
	}
	else
	{
		for(i in data.resp)
		{
		
			$('#movie-table').append('<tr>'	+'<td  style="background-color:#6FACD5;color:#ffffff; " >'+data.resp[i].d_codigo+'</td>'+'<td>'+data.resp[i].d_asenta+'</td>'+'<td>'+data.resp[i].d_tipo_asenta+'<td>'+data.resp[i].D_mnpio+'</td>'+'<td>'+data.resp[i].d_estado+'</td>'+
					'</tr>');
		}
		$.mobile.changePage("#lista");
	}
	
	
}
function onDeviceReady() {
    checkConnection();
    document.addEventListener("menubutton", menuPulsado, false);
}

function checkConnection() {
    var networkState = navigator.network.connection.type;
    var flag = false;
	if(networkState == Connection.NONE){
		// No tenemos conexión
		showAlert('Red no disponible. Reintente más tarde','Error','Aceptar',alertDismissed);
	}
	else{
		flag = true;
	}
	
	return flag;
}

function onSuccess(position) {
	
    get_geocp(position.coords.latitude ,position.coords.longitude);
  
}

// La función 'callback' onError recibe un objeto `PositionError`.
//
function onError(error) {
	showAlert('código: '    + error.code    + '\n' + 'mensaje: ' + error.message + '\n','Error','Aceptar',null);
}


function get_geocp(latitud,longitud)
{
	var params = {latlng:latitud+','+longitud,sensor:true};	
	$.ajax({
        url: 'http://maps.googleapis.com/maps/api/geocode/json',
        data: params,
        dataType: 'json',
        success: function (datacp, textStatus, jqXHR) {
          $('#datageocp').html('<h4><img src="Marker.png" />'+datacp['results'][0].formatted_address+'</h4>');
         
        }
    });
	
}

//document ready
$(document).ready(function() {
  // Handler for .ready() called.
	
	document.addEventListener("deviceready", onDeviceReady, false);
	
	$( document ).ajaxStart(function() {
		$( "#floatingBarsG" ).show();
	});
	$( document ).ajaxStop(function() {
		$( "#floatingBarsG" ).hide();
	});
	//controla el submit del login
	$('#consulta').submit(function(){
		var datoCP = $("#cp").val();
	
		if(checkConnection() == false)
		{
			return false;
		}
		else if(datoCP =="")
		{
			showAlert('El campo Código postal es requerido','Alerta','Aceptar',alertDismissed);
			return false;
		}
		else if( datoCP.length > 5)
		{
			showAlert('El campo Código postal solo es de 5 dígitos','Error','Aceptar',alertDismissed);
			return false;
		}
		else
		{
			var params = {cp:datoCP,fun:1,pkey:'123'};	
			jsonp('http://ideame.hol.es/appCP/api.php',params,'jsonpCallbackC','complete','faild');
		}
		
	    return false;
	});
	
	
	$('#busqueda').submit(function(){
		var datoColonia = $("#colonia").val();
		var datoEdo = $("#estado").val();
		if(checkConnection() == false)
		{
			return false;
		}
		else if(datoColonia =="")
		{
			showAlert('El campo Población/Colonia es requerido','Alerta','Aceptar',alertDismissed);
			return false;
		}
		else
		{
			var params = {colonia:datoColonia,estado:datoEdo,fun:2,pkey:'123'};	
			jsonp('http://ideame.hol.es/appCP/api.php',params,'jsonpCallbackB','complete','faild');
		}
			  
	    return false;
	});
	
	$('#ubicame').click(function(){
		
		 navigator.geolocation.getCurrentPosition(onSuccess, onError);
		
	});
});
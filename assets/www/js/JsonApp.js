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
			var params = {cp:datoCP};	
			jsonp('http://localhost/appCP/JsonController.php',params,'jsonpCallback','complete','faild');
		}
		
	    return false;
	});
	
	
	$('#busqueda').submit(function(){
		var datoColonia = $("#colonia").val();
	
		if(datoColonia =="")
		{
			showAlert('El campo Población/Colonia es requerido','Alerta','Aceptar',alertDismissed);
			return false;
		}
		else
		{
			var params = {col:datoColonia};	
			jsonp('http://localhost/appCP/JsonController.php',params,'jsonpCallback','complete','faild');
		}
			  
	    return false;
	});
	
	
});
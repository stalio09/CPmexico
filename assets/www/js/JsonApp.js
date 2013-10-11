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
	$("#list").empty();
	for(i in data.resp)
	{
		
		$('#list').append('<li>'+data.resp[i].d_codigo+'\n'+data.resp[i].d_asenta+'\n'+data.resp[i].d_estado+'</li>');
	}
	$.mobile.changePage("#lista");
	    //console.log(data.resp[i].d_codigo)

}

function jsonpCallbackB(data)
{
	alert(data.resp);
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
			var params = {col:datoColonia,edo:datoEdo,fun:2};	
			jsonp('http://localhost/appCP/api.php',params,'jsonpCallbackB','complete','faild');
		}
			  
	    return false;
	});
	
	
});
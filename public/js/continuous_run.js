function sendData(button){
	alert(button.id);
	if(button.id == 'stop') Materialize.toast("STAND BY", 7000, 'red lighten-1');
	else Materialize.toast("Running " + button.id.toUpperCase(), 10000, 'red lighten-1');
}

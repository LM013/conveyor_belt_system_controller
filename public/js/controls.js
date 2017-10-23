function sendData(button){
	var startTime = new Date().getTime();
	var data = 'control='+button.id;
  $.post('/send', data, function(res){
    if(res.status == 200){
    	Materialize.toast(res.message, 3000, 'green lighten-1');  
    	var endTime = new Date().getTime();
			var timeDiff = endTime-startTime;
			Materialize.toast('operation took ' + timeDiff/1000 + ' seconds to complete.', 4000, 'blue lighten-1'); 
    }
    else
    	Materialize.toast(res.message, 3000, 'red lighten-1');
    
  });
  
  
}
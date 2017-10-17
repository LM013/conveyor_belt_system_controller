$(document).ready(function(){
  for(var i = 1; i <= 1; i++){
    $('#holder').append(
      $('<div>')
        .attr('class', 'card-panel blue-grey darken-1')
        .attr('id', 'controls')
        .append(
          $('<img>')
            .attr('src', 'public/images/gear_'+i+'.png')
            .attr('class', 'gears')
          ,
          $('<br/>')
          ,
          $('<br/>')
          ,
          $('<button>')
          .attr('id', i)
          .attr('class','btn connect_btn')
          .text('CONNECT')
        )  
    )     
  }

  $('.btn').on('click', connect);
});

function connect(){
  var data = 'id='+(this.id-1);
  $.post('/select', data, function(res){
    if(res.status == 400){
      Materialize.toast(res.message, 3000, 'red lighten-1');  
    } else {
      window.location.href='/operation';
    }
  });
}



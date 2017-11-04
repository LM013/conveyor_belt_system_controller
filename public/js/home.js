$(document).ready(function(){
  $.get('/list', function(length){
    if(length > 6) length = 6;
    for(var i = 1; i <= length; i++){     
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
          ,
          $('<br/>')
          ,
          $('<button>')
            .attr('id', 'i')
            .attr('data-target', 'modal' + i)
            .attr('class', 'btn logs_btn modal-trigger')
            .text('VIEW LOGS')
        ),
      $('<div>')
        .attr('id', 'modal' + i)
        .attr('class', 'modal modal-fixed-footer')
        .append(
          $('<div>')
            .attr('class', 'modal-content')
            .append(
              $('<h4>')
                .text('Controller #' + i)
              ,
              $('<table>')
                .append(
                  $('<thead>')
                    .append(
                      $('<tr>')
                        .append(
                          $('<th>')
                            .text('User'),
                          $('<th>')
                            .text('Operation'),
                          $('<th>')
                            .text('Time')   
                        )
                    )
                )    
            ),
          $('<div>')
            .attr('class', 'modal-footer')
            .append(  
              $('<button>')
                .attr('class', 'btn hide_btn modal-close') 
                .text('Close')
            )
        )
    )
  }

  $('.modal').modal();
  $('.connect_btn').on('click', connect);
  $('.logs_btn').on('click', view_logs);
  });
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

function view_logs(){
  $('#modal'+i).modal('open');
}
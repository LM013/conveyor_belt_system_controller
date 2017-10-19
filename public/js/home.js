var con = ["", ];
var n = 6;//prompt("Please enter number of controllers(1-6)", "");
for(var i = 1 ; i <= n; i++){
  var c = {};
  c.ip = '8.8.8.'+i;
  con.push(c);
}

$(document).ready(function(){
  for(var i = 1; i <= n; i++){
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
            .attr('id', 'i')
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
  //$('.hide_btn').on('click', hide_logs);
});

function connect(){
  var ip = con[this.id].ip;
  $.get('/connect?ip='+ip, {
    method: 'GET',
      credentials: 'include',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept':'application/json'
      }
  })
  .then((res) => {
    if(res.status == '200')
      window.location.href='operation';
    else
      Materialize.toast("Error  ", 3000, 'red lighten-1');
  });
}

function view_logs(){
  $('#modal'+i).modal('open');
}
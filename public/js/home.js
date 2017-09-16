var controllers = ["", ];
var n = prompt("Please enter number of controllers(1-6)", "");
for(var i = 1 ; i <= n; i++){
  var c = {};
  c.ip = '8.8.8.'+i;
  controllers.push(c);
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
          .attr('id', i)
          .attr('class','btn connect_btn')
          .text('CONNECT')
        )  
    )     
  }

  $('.btn').on('click', connect);
});

function connect(){
  window.location.href="/operation";
}



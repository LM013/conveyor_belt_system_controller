$(document).ready(function(){
  for(var i = 1; i <= 6; i++){
    $('#cardHolder').append(
      $('<a>')
        .attr("href", "operation")
        .append(
          $('<div/>')
            .attr("class", "col s12 m4")
            .append(
              $('<div/>')
                .attr("class", "card-panel blue-grey darken-1")
                .append(
                  $('<span/>')
                  .attr("class", "white-text")
                  .text("Controller #"+i)
                )
              )
          )  
    )     
  }
});

$(document).ready(function(){
	/*$("#signout").on({
		"hover": function(){
			//on hover, underline text
			this.style.backgroundColor = "blue";
			Materialize.toast("sign out ka?", 4000, "red");
		},
		"click": function(){
			Materialize.toast("signed out kana", 4000, "red");
			window.location.href="/";
		}
	});

	 $('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrainWidth: false, // Does not change width of dropdown to that of the activator
      hover: true, // Activate on hover
      gutter: 0, // Spacing from edge
      belowOrigin: false, // Displays dropdown below the button
      alignment: 'left', // Displays dropdown with edge aligned to the left of button
      stopPropagation: false // Stops event propagation
    }
  );*/

  $('#jogging_btn').on('click', jogging);
  $('#disconnect').on('click', disconnect);
  $('#run_btn').on('click', run);
});

function disconnect(){
	window.location.href = '/disconnect';
}

function jogging(){
	window.location.href= '/jogging';
}

function run(){
	window.location.href= '/continuous_run';
}
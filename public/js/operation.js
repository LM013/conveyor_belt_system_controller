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

  $('#disconnect').on('click', disconnect);
});

function disconnect(){
	window.location.href = '/disconnect';
}
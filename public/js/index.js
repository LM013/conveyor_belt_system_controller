$(document).ready(function(){
	console.log("hallo");
	$("#signup_div").hide();

	//CLEAR FORMS
	$("#loginForm").trigger("reset");
	$("#signupForm").trigger("reset");

	//
	$("#login_footer").on({
		"click": function(){
			$("#login_div").hide();
			$("#signup_div").toggle("slide");
			Materialize.toast('SIGN UP KA', 4000)
		}	
	});

	$("#signup_footer").on({
		"click": function(){
			$("#signup_div").hide();
			$("#login_div").toggle("slide");
			Materialize.toast('LOG IN KA', 4000)
		}	
	});
});

$("#signuptbtn").click(signUp);

function signUp(){
	alert("hello");
}
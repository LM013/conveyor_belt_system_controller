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
			$("#signup_div").show();
		}	
	});

	$("#signup_footer").on({
		"click": function(){
			$("#signup_div").hide();
			$("#login_div").show();
		}	
	});

	$('#username').val('');
	$('#password').val('');
});

$("#signuptbtn").click(signUp);

function signUp(){
	alert("hello");
}
$('#loginForm').on('submit', function(e){
	e.preventDefault();
	var username = $('#username').val();
	var password = $('#password').val();
	var message = '';
	var data = "username=" + username + "&password=" + password;
	if(username!=''&&password!=''){
		fetch('/api/account/login', {
			method: 'POST',
	        credentials: 'include',
	        headers: {
	            'Content-Type': 'application/x-www-form-urlencoded',
	            'Accept':'application/json'
	        },
	        body: data
		})
		.then((res) => {
			switch (res.status) {
	            case 403: message = 'Username and Password combination'
	                + ' does not match!'; break;
	            case 404: message = 'Username is not registered to'
	             + ' any account!'; break;
	            case 500: message = 'Log-in failed. Please try again.';
	                break;
	            default: message = 'Error logging in!'; break;
	        }
	        if (res.status === 200) {
	            alert("log in very good!");
	        } else {
	            Materialize.toast(message, 4000, 'red');
			}
		});
	} else {
		Materialize.toast("Username and Password Required", 3000, 'red');
	}
});
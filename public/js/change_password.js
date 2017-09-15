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
	            window.location.href="/home";
	        } else {
	            Materialize.toast(message, 4000, 'red');
	            $("#password").val("");
			}
		});
	} else {
		Materialize.toast("Username and Password Required", 3000, 'red lighten-1');
	}
});
fetch('/api/account/whoami', {
	method: 'GET',
    credentials: 'include',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept':'application/json'
    }
})
.then((res) => {
	$('#user').text("Hello, "+JSON.stringify(res));
});
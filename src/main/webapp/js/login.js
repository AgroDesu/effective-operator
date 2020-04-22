let requestButtonTemplate = `
<button class="btn btn-outline-warning" id="requestbtn">New Request</button>
`;
let managerButtonTemplate = `
<button class="btn btn-outline-warning" id="managerbtn">Request Manager</button>
`;
let unauthenticated = `
    <ul class="navbar-nav mr-auto">
    </ul>
    <button class="btn btn-outline-warning my-2 my-sm-0" data-toggle="modal"
    data-target="#loginModal">Login</button>
    `;
let authenticated = `
    <ul class="navbar-nav mr-auto">
        <li class="nav-item active" id="navlinks">
            ${requestButtonTemplate} 
        </li>
    </ul>

	Welcome,&nbsp;<span id="authUserName"></span>
	<button class="btn btn-outline-danger ml-3 my-2 my-sm-0" id="logout">Logout</button>
	`;
employee = null;
baseURL = '/';
navbar = document.getElementById('navbarSupportedContent');

function updateNavBar() {
	console.log('updating nav bar');
	
	navbar.innerHTML = unauthenticated;
	
	// add event listeners
	// document.getElementById('login').addEventListener('click', authenticate);
	// authenticate();
	$.get(baseURL+'login').done(successfulLogin);

	$('#loginform').submit(function(event) {
		event.preventDefault();
		$('#login').html(`<img src="img/load.gif" style="height: 1em;">`);
		$('#loginformerror').html('');
		$.ajax({
			url: baseURL+'login',
			data: JSON.stringify($(this).serializeArray()),
			dataType: 'json',
			type: 'POST',
			contentType: 'application/json',
			success: successfulLogin,
			error: function(){
				$('#login').html(`Login`);
				$('#loginformerror').html('Invalid login credentials!');
			}
		})
		// $.post(baseURL+'login', data,'json')
		// .done(successfulLogin)
		// .fail(function(){
		// 	$('#login').html(`Login`);
		// 	$('#loginformerror').html('Invalid login credentials!');
		// });
	});
}

function successfulLogin(data) {
	$('#login').html(`Login`);
	employee = data;
	if (!employee) return;
	navbar.innerHTML=authenticated;
	loadRequestManager();
	document.getElementById('logout').onclick=logout;
	if (employee) {
		$('#authUserName').html(employee.title+' '+employee.fullname);
		$('#loginModal').modal('hide');
		// let btns = document.getElementsByClassName('emp-btn');
		// for (let i = 0 ; i< btns.length; i++){
		// 	btns[i].disabled = false;
		// }
	}
}

function logout() {
	console.log("logging out");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = finish;
    xhttp.open("DELETE", baseURL + "logout");
    xhttp.send();
    
    function finish() {
    	if (xhttp.readyState === 4 && xhttp.status === 204) {
            navbar.innerHTML = unauthenticated;
			window.location.replace(baseURL);
        }
    }
	
}
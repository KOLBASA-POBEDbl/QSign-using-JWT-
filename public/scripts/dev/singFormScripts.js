if(document.getElementById('signInForm')) document.getElementById('signInForm').style.display = 'none';

function clearingInputs() {
    document.getElementById('first_name').value = '';
    document.getElementById('last_name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('password').value = '';
    document.getElementById('passwordCheck').value = '';
}

function switchMode() {
    let signInForm = document.getElementById('signInForm');
    let signUpForm = document.getElementById('signUpForm');
    let signIn = document.getElementById('signIn');
    let signUp = document.getElementById('signUp');
    let switchMode = document.getElementById('switch');

    if(signInForm.style.display == 'none') {
        signUpForm.style.display = 'none';
        signInForm.style.display = 'flex';
        signIn.style.display = 'block';
        signUp.style.display = 'none';
        switchMode.innerText = 'Go to Sign Up'
    } else {
        signUpForm.style.display = 'flex';
        signInForm.style.display = 'none';
        signIn.style.display = 'none';
        signUp.style.display = 'block';
        switchMode.innerText = 'Go to Sign In'
    }

}

function signUp() {
    let firstName = document.getElementById('first_name').value;
    let lastName = document.getElementById('last_name').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    let password = document.getElementById('password').value;
    let passwordCheck = document.getElementById('passwordCheck').value;

    if(/^[a-zA-Z]+$/.test(firstName)) {
        if(/^[a-zA-Z]+$/.test(lastName) || lastName == '') {
            if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
                if(/^[0-9]+$/.test(phone)) {
                    if(password != '' && passwordCheck != '' && password == passwordCheck) {
                        $.post("/api/users",
                        {
                            first_name: firstName,
                            last_name: lastName,
                            email: email,
                            phone: phone,
                            password: passwordCheck
                        }, function(data) { console.log(data); $(location).attr("href", "/"); });                        
                        //clearingInputs();
                    } else {alert('Passwords do not match!')}
                } else {alert('This is not a phone number!')}
            } else {alert('Incorrect email!')}
        } else {alert('Are you sure your last name is ' + lastName + '?')}
    } else {alert('Incorrect first name!')}
}

function signIn() {
    let email = document.getElementById('emailLog').value;
    let password = document.getElementById('passwordLog').value;
    
    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        if(password != '') {
            $.post("/api/login",
            {
                email: email,
                password: password
            }, function(data) { console.log(data); $(location).attr("href", "/"); });
        } else {alert('Did you forget about password?')}
    } else {alert('XD\nThis is really your email?')}
}
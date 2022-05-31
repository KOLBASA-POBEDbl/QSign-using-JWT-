var userData = {
    /*
    userID
    password
    */
};
function disabletor(pressF) {
    document.getElementById('changeFirstName').disabled = pressF;
    document.getElementById('changeLastName').disabled = pressF;
    document.getElementById('changeEmail').disabled = pressF;
    document.getElementById('changePhone').disabled = pressF;
    document.getElementById('changePassword').disabled = pressF;
    document.getElementById('changePasswordCheck').disabled = pressF;
    document.getElementById('sendChanges').disabled = pressF;
}

function searchUser() {
    let userID = document.getElementById('search').value;
    if(userID && /^[0-9]+$/.test(userID)) {
        userData.userID = userID;
        $.get("/api/users/" + userData.userID, function(data) {
            document.getElementById('greetinForm').style.display = 'none';
            document.getElementById('changeUserForm').style.display = 'flex';
            document.getElementById('changeButtonsSet').style.display = 'flex';

            let firstName = document.getElementById('changeFirstName');
            let lastName = document.getElementById('changeLastName');
            let email = document.getElementById('changeEmail');
            let phone = document.getElementById('changePhone');

            firstName.value = data.first_name;
            lastName.value = data.last_name;
            email.value = data.email;
            phone.value = data.phone;
            userData.password = data.password;
        });
    } else {alert('No. This is not an ID.')}
}

function getPermission() {
    $.post("/api/users/permission", function(data) {
        if(data.OK) {
            disabletor(false);
            alert('Granted!');
            document.getElementById('getPermission').disabled = true;
        }
    });
}

function sendChanges() {
    let firstName = document.getElementById('changeFirstName');
    let lastName = document.getElementById('changeLastName');
    let email = document.getElementById('changeEmail');
    let phone = document.getElementById('changePhone');
    let password = document.getElementById('changePassword');
    let passwordCheck = document.getElementById('changePasswordCheck');

    if(/^[a-zA-Z]+$/.test(firstName.value)) {
        if(/^[a-zA-Z]+$/.test(lastName.value) || lastName.value == '') {
            if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)) {
                if(/^[0-9]+$/.test(phone.value)) {
                    if(password.value == passwordCheck.value) {
                        $.ajax({
                            url: "/api/users/" + userData.userID,
                            type: 'PUT',
                            success: (data) => {console.log(data)},
                            data: 
                            {
                                first_name: firstName.value,
                                last_name: lastName.value,
                                email: email.value,
                                phone: phone.value,
                                password: !passwordCheck.value ? userData.password : passwordCheck.value
                            }
                        });
                        notifyEveryine(userData.userID);

                        firstName.value = '';
                        lastName.value = '';
                        email.value = '';
                        phone.value = '';
                        password.value = '';
                        passwordCheck.value = '';
                        document.getElementById('greetinForm').style.display = 'flex';
                        document.getElementById('changeUserForm').style.display = 'none';
                        document.getElementById('changeButtonsSet').style.display = 'none';
                        disabletor(true);
                        userData = {};
                        document.getElementById('getPermission').disabled = false;

                    } else {alert('Passwords do not match!')}
                } else {alert('This is not a phone number!')}
            } else {alert('Incorrect email!')}
        } else {alert('Are you sure your last name is ' + lastName + '?')}
    } else {alert('Incorrect first name!')}
}
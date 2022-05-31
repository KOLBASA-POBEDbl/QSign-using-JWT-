function notifyEveryine (pressF) {
    if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
    } else {
        if (Notification.permission === "granted") {
            var notification = new Notification('The data of ' + pressF + 'th user was changed.');
        } else {
            if (Notification.permission !== 'denied') {
                Notification.requestPermission(function (permission) {
                    if (!('permission' in Notification)) {
                        Notification.permission = permission;
                    }
                    if (permission === "granted") {
                        var notification = new Notification('The data of ' + pressF + 'th user was changed.');
                    }
                });
            }
        }
    } 
}
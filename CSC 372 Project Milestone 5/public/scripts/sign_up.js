"use strict";


const login_form = document.getElementById("login-form");
login_form.addEventListener("submit", loginAttempt);


async function loginAttempt(event) {
    event.preventDefault();

    let form_data = new FormData(login_form);

    const response = await fetch('http://localhost:3000/users/create', {
        method: 'POST',
        body: form_data,

    })
        .then(response => response)
        .then(data => console.log(data))
        .catch(error => console.log(error));

    console.log(form_data.data);

    window.location.replace("index.html");
}
"use strict";


fetch(`http://localhost:3000/users/login/check`)
    .then((response) => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then((data) => { // Process the retrieved data
        console.log(data);
        if (data["userId"] === null) {
            let item = document.createElement("li");
            item.classList.add("flex-nav");
            item.innerHTML = `<a href="login.html">Login</a>`;
            document.querySelector(".navbar").appendChild(item);
        } else {
            let item = document.createElement("li");
            item.classList.add("flex-nav");
            item.id = "sign-out-btn";
            item.innerHTML = 'Sign out';
            document.querySelector(".navbar").appendChild(item);
            const sign_out = document.getElementById("sign-out-btn");
            sign_out.addEventListener("click", signUserOut);
        }


        function signUserOut() {
            fetch(`http://localhost:3000/users/logout`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then((data) => { // Process the retrieved dat
                    window.location.replace("");
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        }

    })
    .catch((error) => {
        console.error("Error:", error);
    });



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
    window.location.replace("login.html");
}

})
.catch((error) => {
console.error("Error:", error);
});
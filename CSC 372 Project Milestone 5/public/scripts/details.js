"use strict";


console.log("jdioewj");

let params = new URLSearchParams(document.location.search);

fetch(`http://localhost:3000/products/?product_id=` + params.get("id"))
.then((response) => {
if (!response.ok) {
throw new Error("Network response was not ok");
}
return response.json();
})
.then((data) => { // Process the retrieved data
console.log("My Data:", data);
document.getElementById("item-name").innerHTML = data[0]["name"];
document.getElementById("description").innerHTML = data[0]["description"];
document.getElementById("item-price").innerHTML = data[0]["price"];
document.getElementById("detail-img").src = data[0]["image_url"];

})
.catch((error) => {
console.error("Error:", error);
});
"use strict";

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

        document.getElementById("product-name").value = data[0]["name"];
        document.getElementById("product-description").value = data[0]["description"];
        document.getElementById("product-price").value = data[0]["price"];
        document.querySelector(".flex-img-cart").src = data[0]["image_url"];
        document.getElementById("product-type").value = data[0]["product_type"];
        document.getElementById("product-id").value = params.get("id");

    })
    .catch((error) => {
        console.error("Error:", error);
    });



const edit_form = document.getElementById("flex-edit-fields");
edit_form.addEventListener("submit", submitForm);

async function submitForm(event) {
    event.preventDefault();

    let form_data = new FormData(edit_form);

    const response = await fetch('http://localhost:3000/products/update', {
        method: 'POST',
        body: form_data,

    })
        .then(response => response)
        .then(data => console.log(data))
        .catch(error => console.log(error));

    console.log(form_data.data);

    window.location.replace("admin-products.html");
}
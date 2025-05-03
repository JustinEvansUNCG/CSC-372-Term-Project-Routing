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



const add_btn = document.getElementById("add-to-cart");
add_btn.addEventListener("click", addToCart);

async function addToCart() {
    let product_id = params.get("id");
    console.log(product_id);
    let form_data = { "product_id": product_id };

    const response = await fetch('http://localhost:3000/carts/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "product_id": product_id }),

    })
        .then(response => response)
        .then(data => console.log(data))
        .catch(error => console.log(error));

    console.log(form_data.data);

    //window.location.replace("admin-products.html");
}
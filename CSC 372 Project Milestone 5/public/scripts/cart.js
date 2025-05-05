"use strict";

let cart_btn = document.getElementById("cart-btn");
cart_btn.addEventListener("click", createCart);

async function createCart() {
    console.log("jfioew");



    const response = await fetch('http://localhost:3000/carts/create/cart', {
        method: 'POST',

    })
        .then(response => response)
        .then(data => console.log(data))
        .catch(error => console.log(error));

    //window.location.replace("cart.html");
}

let item_list = document.getElementById("flex-cart");

fetch(`http://localhost:3000/carts/getItems`)
.then((response) => {
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    return response.json();
})
.then((data) => { // Process the retrieved data
    console.log("My Data:", data);
    console.log(data.length);
    let final_cost = 0;
    for (let i = 0; i < data.length; i++) {
        let item = document.createElement("div");
        item.classList.add("flex-item-cart");
        item.innerHTML = `        

                <img class="flex-img-cart" src="` + data[i]["image_url"] + `" alt="">

                <div class="flex-info-cart">
                <p class="item-name">` + data[i]["name"] + `</p>
                <p>
                    
                   
                    <br>
                    Price: $` + data[i]["price"] + `
                    <br>


                </p>
                </div>

                <div class="flex-buy-cart">
                <form action="#">
                    <input type="submit" value="Details">
                </form>
                <p>Quantity:</p>
                <input type="number" class="quantity" value="` + data[i]["quantity"] + `">
                <p class="total">Total: $` + data[i]["quantity"] * data[i]["price"] + `</p>
               
                <button class="remove-btn">Remove</button>
            `;


        item_list.appendChild(item);
        final_cost += data[i]["price"] * data[i]["quantity"] ;
        let this_cost = data[i]["price"];
        let item_total = document.querySelectorAll(".total")[i];

        const current_item = document.querySelectorAll(".flex-item-cart")[i];
        const remove_btn = document.querySelectorAll(".remove-btn")[i];
        remove_btn.addEventListener("click", removeItem);
        
        async function removeItem() {
            const response = await fetch('http://localhost:3000/carts/remove', {
                method: 'POST',        
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "product_id": data[i]["product_id"] }),
        
            })
                .then(response => response)
                .then(data => {
                    
                    final_cost = final_cost - this_cost;
                    document.getElementById("cost-header").innerHTML = "Cost: " + final_cost;
                    current_item.remove();
                })
                .catch(error => console.log(error));
        }

        const quantity_field = document.querySelectorAll(".quantity")[i];
        console.log(quantity_field.value);
        quantity_field.addEventListener("blur", quantityCheck);
        quantity_field.addEventListener("click", quantityCheck);

        const price = data[i]["price"];


        async function quantityCheck() {

            if(data[i]["quantity"] !== quantity_field.value) {

            

            const response = await fetch('http://localhost:3000/carts/update', {
                method: 'POST',        
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "product_id": data[i]["product_id"],
                    "quantity": quantity_field.value
                 }),
        
            })
                .then(response => response)
                .then(data => {
                    const total_cost = item_total;
                    let old_cost = parseInt(total_cost.innerHTML.replace("Total: $", ""));
                    total_cost.innerHTML = `Total: $` + quantity_field.value * price;
                    final_cost = final_cost - old_cost + quantity_field.value * price;
                    document.getElementById("cost-header").innerHTML = "Cost: " + final_cost;

                })
                .catch(error => console.log(error));



            }
        
        }

    }

    document.getElementById("cost-header").innerHTML = "Cost: " + final_cost;
})
.catch((error) => {
    console.error("Error:", error);
});

const checkout_btn = document.getElementById("checkout-btn");
checkout_btn.addEventListener("click", displayModal);

function displayModal() {
    console.log(document.getElementById("product-modal"));
    //document.getElementById("product-modal").style.display = "block";
    document.getElementById("product-modal").style.display = "flex";

    const items = document.querySelectorAll(".flex-item-cart");
    const checkout_list = document.getElementById("product-modal-info");
    for(let j = 0; j < items.length; j++) {
        let item = document.createElement("div");
        item.classList.add("checkout-names");
        item.innerHTML = items[j].querySelector(".item-name").innerHTML;
        checkout_list.appendChild(item);
    }

    const purchase_btn = document.getElementById("checkout-final");
    purchase_btn.addEventListener("click", purchaseItems);

    async function purchaseItems() {
        const response = await fetch('http://localhost:3000/carts/clear', {
            method: 'POST',        
    
        })
            .then(response => response)
            .then(data => {
                window.location.replace("cart.html");
            })
            .catch(error => console.log(error));
    }


    const close_btn = document.querySelector(".close");
    close_btn.addEventListener("click",  closeModal);

    function closeModal() {
        document.getElementById("product-modal").style.display = "none";
        close_btn.removeEventListener("click", closeModal);
        document.getElementById("product-modal-info").innerHTML = `<h2>Checkout</h2>
                <span class="close">&times</span>
                <br>
                <button id=checkout-final>Checkout</button>`;


    }
}
"use strict";

let params = new URLSearchParams(document.location.search);



let modal_btn = document.getElementById("product-modal-btn");
modal_btn.addEventListener("click", displayModal);

function displayModal() {
    console.log(document.getElementById("product-modal"));
    //document.getElementById("product-modal").style.display = "block";
    document.getElementById("product-modal").style.display = "flex";


    const close_btn = document.querySelector(".close");
    close_btn.addEventListener("click",  closeModal);

    function closeModal() {
        console.log("nfioew");
        document.getElementById("product-modal").style.display = "none";
        close_btn.removeEventListener("click", closeModal);


    }

    const product_form = document.getElementById("product-add-form");
    product_form.addEventListener("submit", submitForm);

    async function submitForm(event) {
        event.preventDefault();
    
        let form_data = new FormData(product_form);
    
        const response = await fetch('http://localhost:3000/products/add', {
            method: 'POST',
            body: form_data,
    
        })
            .then(response => response)
            .then(data => console.log(data))
            .catch(error => console.log(error));
    
        console.log(form_data.data);
    
        window.location.replace("admin-products.html");
    }


}



let item_list = document.getElementById("flex-admin-view");

if (!params.get("search") && !params.get("type")) {
    fetch(`http://localhost:3000/products/all`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => { // Process the retrieved data
            console.log("My Data:", data);
            for (let i = 0; i < data.length; i++) {
                let item = document.createElement("div");
                item.classList.add("flex-item-cart");
                item.innerHTML = `


                <img class="flex-img-cart" src="images/RTX4070Sup.webp" alt="GeForce_RTX_4070_Sup">

                <p class="flex-info-cart">
                    
                        ` + data[i]["name"] + `
                    
                    <br>
                    Product ID: ` + data[i]["product_id"] + `
                    <br>
                    Price: $` + data[i]["price"] + `
                    <br>
                    Item Type: ` + data[i]["product_type"] + `
                    <br>
                    Image Path: ` + data[i]["image_url"] + `
                    <br>
                    Description: ` + data[i]["description"] + `



                </p>

                <div class="flex-buy-cart">


                    
                    <form class="delete-form" method="post">
                        <input type="hidden" name="product_id" value="` + data[i]["product_id"] + `">
                        <input type="submit" value="Remove">
            
                    </form>

                    <form action="admin-edit.html">
                        <input type="hidden" name="id" value="` + data[i]["product_id"] + `">
                        <input type="submit" value="Edit">
            
                    </form>`;

                item_list.appendChild(item);

            }


            const remove_forms = document.getElementsByClassName("delete-form");
            console.log(remove_forms.length);

            for(let j = 0; j < remove_forms.length; j++) {
                const current_form = remove_forms[j];
                
                current_form.addEventListener("submit", deleteProduct); 


                async function deleteProduct(event) {
                    event.preventDefault();
    
    
                    let form_data = new FormData(current_form);
        
                    const response = await fetch('http://localhost:3000/products/remove', {
                        method: 'POST',
                        body: form_data,
                
                    })
                        .then(response => response)
                        .then(data => console.log(data))
                        .catch(error => console.log(error));
                
                    console.log(form_data.data);
                
                    window.location.replace("admin-products.html");
    
                }
            }




        })
        .catch((error) => {
            console.error("Error:", error);
        });


}






if (!params.get("search") && !params.get("type")) {
    fetch(`http://localhost:3000/products/all`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => { // Process the retrieved data
            console.log("My Data:", data);
            for (let i = 0; i < data.length; i++) {
                console.log("dhuiewfj");
                let item = document.createElement("div");
                item.classList.add("flex-item-cart");
                item.innerHTML = `


                <img class="flex-img-cart" src="images/RTX4070Sup.webp" alt="GeForce_RTX_4070_Sup">

                <p class="flex-info-cart">
                    
                        ` + data[i]["name"] + `
                    
                    <br>
                    Product ID: ` + data[i]["product_id"] + `
                    <br>
                    Price: $` + data[i]["price"] + `
                    <br>
                    Item Type: ` + data[i]["product_type"] + `
                    <br>
                    Image Path: ` + data[i]["image_url"] + `
                    <br>
                    Description: ` + data[i]["description"] + `



                </p>

                <div class="flex-buy-cart">


                    
                    <form class="delete-form" method="post">
                        <input type="hidden" name="product_id" value="` + data[i]["product_id"] + `">
                        <input type="submit" value="Remove">
            
                    </form>

                    <form action="admin-edit.html">
                        <input type="hidden" name="id" value="` + data[i]["product_id"] + `">
                        <input type="submit" value="Edit">
            
                    </form>`;

                item_list.appendChild(item);

            }


            const remove_forms = document.getElementsByClassName("delete-form");
            console.log(remove_forms.length);

            for(let j = 0; j < remove_forms.length; j++) {
                const current_form = remove_forms[j];
                
                current_form.addEventListener("submit", deleteProduct); 


                async function deleteProduct(event) {
                    event.preventDefault();
    
    
                    let form_data = new FormData(current_form);
        
                    const response = await fetch('http://localhost:3000/products/remove', {
                        method: 'POST',
                        body: form_data,
                
                    })
                        .then(response => response)
                        .then(data => console.log(data))
                        .catch(error => console.log(error));
                
                    console.log(form_data.data);
                
                    window.location.replace("admin-products.html");
    
                }
            }




        })
        .catch((error) => {
            console.error("Error:", error);
        });


}


if (!params.get("search") && !params.get("type")) {
    fetch(`http://localhost:3000/products/all`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => { // Process the retrieved data
            console.log("My Data:", data);
            for (let i = 0; i < data.length; i++) {
                console.log("dhuiewfj");
                let item = document.createElement("div");
                item.classList.add("flex-item-cart");
                item.innerHTML = `


                <img class="flex-img-cart" src="images/RTX4070Sup.webp" alt="GeForce_RTX_4070_Sup">

                <p class="flex-info-cart">
                    
                        ` + data[i]["name"] + `
                    
                    <br>
                    Product ID: ` + data[i]["product_id"] + `
                    <br>
                    Price: $` + data[i]["price"] + `
                    <br>
                    Item Type: ` + data[i]["product_type"] + `
                    <br>
                    Image Path: ` + data[i]["image_url"] + `
                    <br>
                    Description: ` + data[i]["description"] + `



                </p>

                <div class="flex-buy-cart">


                    
                    <form class="delete-form" method="post">
                        <input type="hidden" name="product_id" value="` + data[i]["product_id"] + `">
                        <input type="submit" value="Remove">
            
                    </form>

                    <form action="admin-edit.html">
                        <input type="hidden" name="id" value="` + data[i]["product_id"] + `">
                        <input type="submit" value="Edit">
            
                    </form>`;

                item_list.appendChild(item);

            }

            const remove_forms = document.getElementsByClassName("delete-form");
            console.log(remove_forms.length);

            for(let j = 0; j < remove_forms.length; j++) {
                const current_form = remove_forms[j];
                
                current_form.addEventListener("submit", deleteProduct); 


                async function deleteProduct(event) {
                    event.preventDefault();
    
    
                    let form_data = new FormData(current_form);
        
                    const response = await fetch('http://localhost:3000/products/remove', {
                        method: 'POST',
                        body: form_data,
                
                    })
                        .then(response => response)
                        .then(data => console.log(data))
                        .catch(error => console.log(error));
                
                    console.log(form_data.data);
                
                    window.location.replace("admin-products.html");
    
                }
            }


        })
        .catch((error) => {
            console.error("Error:", error);
        });


} else if (params.get("search") && params.get("type")){
    console.log(params.get("search"));
    fetch(`http://localhost:3000/products/?name=` + params.get("search") + `&type=` + params.get("type"))
    .then((response) => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then((data) => { // Process the retrieved data
        console.log("My Data:", data);
        for (let i = 0; i < data.length; i++) {
            console.log("dhuiewfj");
            let item = document.createElement("div");
            item.classList.add("flex-item-cart");
            item.innerHTML = `


                <img class="flex-img-cart" src="images/RTX4070Sup.webp" alt="GeForce_RTX_4070_Sup">

                <p class="flex-info-cart">
                    
                        ` + data[i]["name"] + `
                    
                    <br>
                    Product ID: ` + data[i]["product_id"] + `
                    <br>
                    Price: $` + data[i]["price"] + `
                    <br>
                    Item Type: ` + data[i]["product_type"] + `
                    <br>
                    Image Path: ` + data[i]["image_url"] + `
                    <br>
                    Description: ` + data[i]["description"] + `



                </p>

                <div class="flex-buy-cart">


                    
                    <form class="delete-form" method="post">
                        <input type="hidden" name="product_id" value="` + data[i]["product_id"] + `">
                        <input type="submit" value="Remove">
            
                    </form>

                    <form action="admin-edit.html">
                        <input type="hidden" name="id" value="` + data[i]["product_id"] + `">
                        <input type="submit" value="Edit">
            
                    </form>`;

            item_list.appendChild(item);

        }

        const remove_forms = document.getElementsByClassName("delete-form");
        console.log(remove_forms.length);

        for(let j = 0; j < remove_forms.length; j++) {
            const current_form = remove_forms[j];
            
            current_form.addEventListener("submit", deleteProduct); 


            async function deleteProduct(event) {
                event.preventDefault();


                let form_data = new FormData(current_form);
    
                const response = await fetch('http://localhost:3000/products/remove', {
                    method: 'POST',
                    body: form_data,
            
                })
                    .then(response => response)
                    .then(data => console.log(data))
                    .catch(error => console.log(error));
            
                console.log(form_data.data);
            
                window.location.replace("admin-products.html");

            }
        }

    })
    .catch((error) => {
        console.error("Error:", error);
    });

} else if (params.get("search") && !params.get("type")){
    console.log(params.get("search"));
    fetch(`http://localhost:3000/products/?name=` + params.get("search"))
    .then((response) => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then((data) => { // Process the retrieved data
        console.log("My Data:", data);
        for (let i = 0; i < data.length; i++) {
            console.log("dhuiewfj");
            let item = document.createElement("div");
            item.classList.add("flex-item-cart");
            item.innerHTML = `


                <img class="flex-img-cart" src="images/RTX4070Sup.webp" alt="GeForce_RTX_4070_Sup">

                <p class="flex-info-cart">
                    
                        ` + data[i]["name"] + `
                    
                    <br>
                    Product ID: ` + data[i]["product_id"] + `
                    <br>
                    Price: $` + data[i]["price"] + `
                    <br>
                    Item Type: ` + data[i]["product_type"] + `
                    <br>
                    Image Path: ` + data[i]["image_url"] + `
                    <br>
                    Description: ` + data[i]["description"] + `



                </p>

                <div class="flex-buy-cart">


                    
                    <form class="delete-form" method="post">
                        <input type="hidden" name="product_id" value="` + data[i]["product_id"] + `">
                        <input type="submit" value="Remove">
            
                    </form>

                    <form action="admin-edit.html">
                        <input type="hidden" name="id" value="` + data[i]["product_id"] + `">
                        <input type="submit" value="Edit">
            
                    </form>`;

            item_list.appendChild(item);

        }

        const remove_forms = document.getElementsByClassName("delete-form");
        console.log(remove_forms.length);

        for(let j = 0; j < remove_forms.length; j++) {
            const current_form = remove_forms[j];
            
            current_form.addEventListener("submit", deleteProduct); 


            async function deleteProduct(event) {
                event.preventDefault();


                let form_data = new FormData(current_form);
    
                const response = await fetch('http://localhost:3000/products/remove', {
                    method: 'POST',
                    body: form_data,
            
                })
                    .then(response => response)
                    .then(data => console.log(data))
                    .catch(error => console.log(error));
            
                console.log(form_data.data);
            
                window.location.replace("admin-products.html");

            }
        }


    })
    .catch((error) => {
        console.error("Error:", error);
    });

} else {
    console.log(params.get("search"));
    fetch(`http://localhost:3000/products/?type=` + params.get("type"))
    .then((response) => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then((data) => { // Process the retrieved data
        console.log("My Data:", data);
        for (let i = 0; i < data.length; i++) {
            console.log("dhuiewfj");
            let item = document.createElement("div");
            item.classList.add("flex-item-cart");
            item.innerHTML = `


                <img class="flex-img-cart" src="images/RTX4070Sup.webp" alt="GeForce_RTX_4070_Sup">

                <p class="flex-info-cart">
                    
                        ` + data[i]["name"] + `
                    
                    <br>
                    Product ID: ` + data[i]["product_id"] + `
                    <br>
                    Price: $` + data[i]["price"] + `
                    <br>
                    Item Type: ` + data[i]["product_type"] + `
                    <br>
                    Image Path: ` + data[i]["image_url"] + `
                    <br>
                    Description: ` + data[i]["description"] + `



                </p>

                <div class="flex-buy-cart">


                    
                    <form class="delete-form" method="post">
                        <input type="hidden" name="product_id" value="` + data[i]["product_id"] + `">
                        <input type="submit" value="Remove">
            
                    </form>

                    <form action="admin-edit.html">
                        <input type="hidden" name="id" value="` + data[i]["product_id"] + `">
                        <input type="submit" value="Edit">
            
                    </form>`;

            item_list.appendChild(item);

        }

        const remove_forms = document.getElementsByClassName("delete-form");
        console.log(remove_forms.length);

        for(let j = 0; j < remove_forms.length; j++) {
            const current_form = remove_forms[j];
            
            current_form.addEventListener("submit", deleteProduct); 


            async function deleteProduct(event) {
                event.preventDefault();


                let form_data = new FormData(current_form);
    
                const response = await fetch('http://localhost:3000/products/remove', {
                    method: 'POST',
                    body: form_data,
            
                })
                    .then(response => response)
                    .then(data => console.log(data))
                    .catch(error => console.log(error));
            
                console.log(form_data.data);
            
                window.location.replace("admin-products.html");

            }
        }


    })
    .catch((error) => {
        console.error("Error:", error);
    });
}




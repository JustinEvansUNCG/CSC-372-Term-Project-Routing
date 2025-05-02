"use strict";

let params = new URLSearchParams(document.location.search);



let item_list = document.getElementById("flex-container");

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
                item.classList.add("flex-item");
                item.innerHTML = `

                <img class="flex-img" src="` + data[i]["image_url"] + `" alt="GeForce_RTX_4070_Sup">


                <br>
                
                    ` + data[i]["name"] + `
                    
                    <br>
                    Price: $` + data[i]["price"] + `
                    <br>
                    <form action="details.html">
                        <input type="hidden" name="id" value="` + data[i]["product_id"] + `">
                        <input type="submit" value="Details">
                    </form>

               
                `;

                item_list.appendChild(item);

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
            item.classList.add("flex-item");
            item.innerHTML = `

            <img class="flex-img" src="` + data[i]["image_url"] + `" alt="GeForce_RTX_4070_Sup">


            <br>
            
                ` + data[i]["name"] + `
                
                <br>
                Price: $` + data[i]["price"] + `
                <br>
                <form action="details.html">
                    <input type="hidden" name="id" value="` + data[i]["product_id"] + `">
                    <input type="submit" value="Details">
                </form>

           
            `;

            item_list.appendChild(item);

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
            item.classList.add("flex-item");
            item.innerHTML = `

            <img class="flex-img" src="` + data[i]["image_url"] + `" alt="GeForce_RTX_4070_Sup">


            <br>
            
                ` + data[i]["name"] + `
                
                <br>
                Price: $` + data[i]["price"] + `
                <br>
                <form action="details.html">
                    <input type="hidden" name="id" value="` + data[i]["product_id"] + `">
                    <input type="submit" value="Details">
                </form>

           
            `;

            item_list.appendChild(item);

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
            item.classList.add("flex-item");
            item.innerHTML = `

            <img class="flex-img" src="` + data[i]["image_url"] + `" alt="GeForce_RTX_4070_Sup">


            <br>
            
                ` + data[i]["name"] + `
                
                <br>
                Price: $` + data[i]["price"] + `
                <br>
                <form action="details.html">
                    <input type="hidden" name="id" value="` + data[i]["product_id"] + `">
                    <input type="submit" value="Details">
                </form>

           
            `;

            item_list.appendChild(item);

        }
    })
    .catch((error) => {
        console.error("Error:", error);
    });
}

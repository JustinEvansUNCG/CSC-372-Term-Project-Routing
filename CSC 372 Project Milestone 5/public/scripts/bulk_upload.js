"use strict";



const upload_form = document.getElementById("bulk-uploader");
upload_form.addEventListener("submit", parseFolder);

async function parseFolder(event) {
    event.preventDefault();
    let form_data = new FormData(upload_form);

    for (const [key, value] of form_data) {
      console.log(value);
    }
    

    const response = await fetch('http://localhost:3000/products/bulk/add', {
        method: 'POST',
        body: form_data,
        //headers: {
        //  "Content-Type": "multipart/form-data",
        //},

    })
        .then(response => response)
        .then(data => console.log(data))
        .catch(error => console.log(error));

    console.log(form_data.data);


}
const socket = io();

socket.on(`products`, data => {
    const productContent = document.getElementById("h1");

    let content = "";

    data.forEach(product => {
        content += `${product.title} ${product.description} ${product.price} ${product.thumbnail} ${product.stock}  <br/>`;
    });
    productContent.innerHTML = content;
}) 
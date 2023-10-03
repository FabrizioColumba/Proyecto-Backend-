const btnCards = document.querySelectorAll('.btnCard');

btnCards.forEach((button) => {
  const quantityElement = button.parentElement.querySelector('.spam-quantity')
  
  let quantity = 1;
  

  button.addEventListener('click', () => {
    const productId = button.dataset.productId;

    const data = {
      productId: productId,
      spamQuantity: quantity
    };
    
    fetch("/api/products/addProductTocart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then((response) => {
        return response.json();
      })
      .then(data => {
        if(data.status === "success"){
          alert('Producto agregado')
        }
        if(data.status === "error"){
          if(data.error === 'producto del usuario'){
            alert('No puedes agregar tus propios productos al carrito')
          }
        }
      })
      .catch(error => {
        console.error( error);
      });
  });

  button.parentElement.querySelector('.btn-subtract-product').addEventListener("click", () => {
    if (quantity > 0) {
      quantity--;
      quantityElement.textContent = quantity;
    }
  });


  const addMoreButton = button.parentElement.querySelector('.btn-add-more-product');
  const stock = parseInt(addMoreButton.getAttribute('data-stock'), 10)
  addMoreButton.addEventListener("click", () => {
    if (quantity < stock) {
      quantity++;
      quantityElement.textContent = quantity;
    } else {
      alert('Límite de stock');
    }
  });
});




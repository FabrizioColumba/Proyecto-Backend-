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
        console.log(response)
        return response.json()
      })
      .then(result => {
        console.log(result.message)
      })
      .catch(error => {
        console.error("Error:", error)
      });
  });

  button.parentElement.querySelector('.btn-subtract-product').addEventListener("click", () => {
    if (quantity > 0) {
      quantity--;
      quantityElement.textContent = quantity
    }
  });

  const addMoreButton = button.parentElement.querySelector('.btn-add-more-product')
  const stock = parseInt(addMoreButton.getAttribute('data-stock'), 10)
  addMoreButton.addEventListener("click", () => {
    if (quantity < stock) {
      quantity++;
      quantityElement.textContent = quantity
    } else {
      alert('Límite de stock');
    }
  })
})



const btnRevertPremium= document.getElementById('btnRevertPremium')
btnRevertPremium.addEventListener('click',()=>{
  const userId = btnRevertPremium.getAttribute('data-user-id');
 fetch('/api/session/revertPremium',
 {
   method: 'POST',
   headers: {
       'Content-Type':'application/json'
   },
   body: JSON.stringify({ userId })
 })
 .then(response=> response.json())
 .then(data=> {
   if(data.status === "success"){
    window.location.replace('/login')
   }
 })

})

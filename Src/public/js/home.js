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
        return response.json()
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
if(btnRevertPremium){
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
}




const btnCerrarSession= document.getElementById('btnCerrarSession')
btnCerrarSession.addEventListener('click', ()=>{
  try{
    fetch('/api/session/cerrarsession', {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === "success") {
          window.location.replace('/')
        }
      })
  }
  catch(error){
    console.log(error)
  }
})






/*
const btnGetPremium= document.getElementById('btnGetPremium')
if(btnGetPremium){
  btnGetPremium.addEventListener('click', ()=>{
    const userId = btnGetPremium.getAttribute('data-user-id');
  fetch('/api/session/convertToPremium',
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
}
*/

/*
const btnRevertPremium= document.getElementById('btnRevertPremium')
if(btnRevertPremium){
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
}
*/
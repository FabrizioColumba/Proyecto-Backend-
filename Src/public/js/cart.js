
console.log('conectado al primer js')

const btnDeleteProductCart= document.querySelectorAll('.delete-product-btn')


btnDeleteProductCart.forEach(btn => {
    btn.addEventListener('click', (e)=>{
        const pid = e.target.dataset.productId;
    
        const data={
            pid:pid
        }

        fetch('/api/cart/deleteproductcart',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((response)=>{
            response.json()
            window.location.replace('/cart')
        }
        )
        .catch(error => {
            console.error('Ocurrió un error al enviar la solicitud borrar product:', error);
        })
       


    })
});


const btnCancelarCompra=document.getElementById('btnCancelarCompra')
btnCancelarCompra.addEventListener('click', ()=>{
   try{
    const cartId =  btnCancelarCompra.getAttribute('data-cart-id')
    fetch('/api/cart/clearCart',{
        method: 'POST',
        body: JSON.stringify({cid:cartId}),
        headers:{
            'Content-Type':'application/json '
        } 
    })
    .then(response=> response.json())
    .then(data=>{
        if(data.status=== "success"){
            window.location.replace('/home')
        }
       })  
    }

   catch(error){
    console.log(error)
   }
})

// /api/cart/deleteproductcart
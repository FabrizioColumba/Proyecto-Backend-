
const btnGenerarTiket= document.getElementById('btnGenerarTiket')

btnGenerarTiket.addEventListener('click', ()=>{
  try{
          
    const cartId = btnGenerarTiket.getAttribute('data-cart-id')

       fetch(`/api/cart/${cartId}/purchase`,{
       method: 'POST',
       body: JSON.stringify({cid:cartId}),
       headers:{
           'Content-Type':'application/json '
       } 
   })
   .then(response=> response.json()) 
   .then(data=>{
    if(data.status ==="error"){
      if(data.error === 'carrito vacio'){
        alert('El carrito debe tener productos para realizar una compra')
      }
    }
    if(data.status=== "success"){
      //window.location.replace(`/${cartId}/purchase`)
      const payload= data.payload
      const userConfirmed = window.confirm(
        `Compra realizada. 
        -Cantidad total de productos: ${payload.totalQuantity}
        -Monto total:$ ${payload.amount}.
        Te enviarémos un correo con los detalles de la compra!
        Muchas gracias por confiar en nosotros.`
       )
      const cid= data.cid
      const tid= data.tid
      if(userConfirmed){
        fetch(`/api/cart/clearTiketAndCart/${cid}/${tid}`,{
          method: 'GET',
      })
      .then(response=> response.json())
      .then(data=>{
        if(data.status === 'success'){
          alert('Orden de compra realizada')
          window.location.replace('/home')
        }
      })

      }
     
    }
   
   })  
   
  }
  catch(error){
    console.log(error)
  }
})
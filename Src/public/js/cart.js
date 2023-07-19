console.log('conectado al js')

const btnDeleteProductCart= document.querySelectorAll('.delete-product-btn')


btnDeleteProductCart.forEach(btn => {
    btn.addEventListener('click', (e)=>{
        const pid = e.target.dataset.productId;
    
        const data={
            pid:pid
        }

        fetch('/api/cart/deleteproductincart',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((response)=>{
            response.json()
            console.log('El btn borrar product funcioni de manera', response)
        }
        )
        .catch(error => {
            console.error('Ocurrió un error al enviar la solicitud borrar product:', error);
        })
       


    })
});

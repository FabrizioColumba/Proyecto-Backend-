
const formUpdateProduct= document.getElementById('formUpdateProduct')

formUpdateProduct.addEventListener('submit', (e)=>{
    e.preventDefault()
   
    const data= new FormData(formUpdateProduct)
    const obj= {}
    data.forEach((value, key)=>obj[key]=value)

    fetch('/api/products/updateProduct',
    {   method: 'PUT',
        body: JSON.stringify(obj),
        headers:{
            'Content-Type':'application/json '
            } 
          
    }
    )
    .then(response => response.json())
    .then(result => {
        if (result.status === "success") {
            alert("Producto modificado")
            formUpdateProduct.reset()
        } else {
            console.log("Error al crear el producto");
        }
    })
})


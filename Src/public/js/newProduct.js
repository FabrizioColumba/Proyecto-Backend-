
const formNewProduct= document.getElementById('formNewProduct')

formNewProduct.addEventListener('submit', (e)=>{
    e.preventDefault()
    const formData = new FormData(formNewProduct)
    
    console.log(formData)
    fetch('/api/products/newproduct',
    {
        method: 'POST',
        body:formData
          
    }
    )
    .then(response => response.json())
    .then(result => {
        if (result.status === "success") {
            alert("Producto creado")
            formNewProduct.reset()
        } else {
            console.error("Error al crear el producto:", result.message);
        }
    })
})


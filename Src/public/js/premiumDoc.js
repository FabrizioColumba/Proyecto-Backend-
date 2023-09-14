const formPremiumDocuments= document.getElementById('formPremiumDocuments')

formPremiumDocuments.addEventListener('submit', (e)=>{
    e.preventDefault()
    const formData = new FormData(formPremiumDocuments)
    
    console.log(formData)
    fetch('/api/users/postPremiumDocuments',
    {
        method: 'POST',
        body:formData
          
    }
    )
    .then(response => response.json())
    .then(result => {
        if (result.status === "success") {
            window.location.replace('/bntconvertpremium')
            
        } else {
            console.error("Error al subir archivos");
        }
    })
})
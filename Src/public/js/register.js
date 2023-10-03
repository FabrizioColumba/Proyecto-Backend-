const form= document.getElementById('registerForm')

form.addEventListener('submit',async (e)=>{
    e.preventDefault()
    const data= new FormData(form)
    const obj= {}
    data.forEach((value, key)=>obj[key]=value)

    try{
        const response = await fetch('/api/session/register', {
            method: 'POST',
            body: JSON.stringify(obj),
            headers:{
                'Content-Type':'application/json '
            } 
        })
        const responseData= await response.json()
        if(responseData.status === 'success'){
            window.location.replace('/login')
        }
        if(data.status === 'error'){
            const aletErrorRegister= document.getElementById('aletErrorRegister')
            const msj= data.error
            aletErrorRegister.innerText= msj 
          }
    }
    catch(err){
        console.log(err)
    }
   
})
const form= document.getElementById('registerForm')



form.addEventListener('submit', async(event)=> {
  try{
    event.preventDefault()
    const formData = new FormData(form);
    const obj = {};
    for (let [key, value] of formData) {
      obj[key] = value;
    }
    
    const user= JSON.stringify(obj)
    

    const response = await fetch('/api/session/register', {
      method: 'POST',
      body: user,
      headers: {
          "Content-Type": "application/json"
      }
    })
   console.log('response',response)
 
    const data= await response.json()

        if(data.status === 'success'){
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
});
  
  
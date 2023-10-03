const form= document.getElementById('roestorePswForm')


form.addEventListener('submit', async(event)=> {
    try{
      event.preventDefault()
      const formData = new FormData(form);
      const obj = {};
      for (let [key, value] of formData) {
        obj[key] = value;
      }
      const user= JSON.stringify(obj)
      const response = await fetch('/api/session/restoreRequest', {
        method: 'POST',
        body: user,
        headers: {
            "Content-Type": "application/json"
        }
      })
     console.log('response',response)
   
      const data= await response.json()
    
      console.log('responseData:',data)  
          if(data.status === 'success'){
            const message= document.getElementById('message')
            message.innerText= 'Correo enviado!'
        }
        if(data.status === 'error'){
            const message= document.getElementById('message')
            message.innerText= 'Correo no encontrado!'
        }
  }
    catch(err){
      console.log(err)
    }
  });
    
    
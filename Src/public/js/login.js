
const form= document.getElementById('loginForm')

form.addEventListener('submit',async (e)=>{
    e.preventDefault()
    const data= new FormData(form)
    const obj= {}
    data.forEach((value, key)=>obj[key]=value)

    try{
        const response = await fetch('/api/session/login', {
            method: 'POST',
            body: JSON.stringify(obj),
            headers:{
                'Content-Type':'application/json '
            } 
        })
        const responseData= await response.json()
        if(responseData.status === 'error'){
            const error= responseData.error
            const spamUserNotFound= document.getElementById('spamUserNotFound')
            spamUserNotFound.innerText= error
            form.reset()
        }
        if(responseData.status === 'success'){
          
           if(responseData.userrole === "ADMIN"){
           window.location.replace('/adminHome')
       
           }
           else{
            window.location.replace('/home')
           }
        }
    
    }
    catch(err){
        console.log(err, 'error del server en login.js')
    }
   
})
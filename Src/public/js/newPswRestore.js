
const form= document.getElementById('newPswForm')
const urlParams= new Proxy(new URLSearchParams(window.location.search),{
    get: (searchParams,prop)=> searchParams.get(prop)
})
console.log()

form.addEventListener('submit',async (e)=>{
    e.preventDefault()
    const data= new FormData(form)
    const obj= {}

    data.forEach((value, key)=>obj[key]=value)
    obj.token= urlParams.token
    try{
        const response = await fetch('/api/session/newPswRestore', {
            method: 'POST',
            body: JSON.stringify(obj),
            headers:{
                'Content-Type':'application/json '
            } 
        })
        const responseData= await response.json()
      
        if(responseData.status === 'success'){
            const msj= document.getElementById('msj')
            msj.innerHTML= `¡Tu nueva contraseña ya está registrada! <a href=/login style=color:yellow;>¡Ingresar!</a>`
        }
        if(responseData.error  === 'misma contraseña'){     
            const msj= document.getElementById('msj')
            msj.innerText= 'Debe ser dista a la anterior contraseña!'
        }
    }
    catch(err){
        console.log(err, 'error del server en login.js')
    }
   
})
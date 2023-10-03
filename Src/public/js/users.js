
const btnDeleteUser= document.getElementById('btnDeleteUser')

btnDeleteUser.addEventListener('click',()=>{
    const uid = btnDeleteUser.dataset.userId;
    const confirmMessage = "Seguro deseas eliminar este usuario? Una vez eliminado no prodrá volver a recuperar su cuenta."
    const userConfirmed = window.confirm(confirmMessage)
    if(userConfirmed){
        fetch(`/api/users/${uid}`, {
            method: "DELETE"
          })
            .then((response) => {
              return response.json();
            })
            .then(data => {
              if(data.status === "success"){
                alert('Usuario eliminado exitosamente')
              }
              if(data.status === "error"){
                alert('Problemas con el servfidor, intentalo más tarde')
              }
            })
            .catch(error => {
              console.error( error);
            });
    }
})
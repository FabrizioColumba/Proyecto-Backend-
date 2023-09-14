const formImgProfile= document.getElementById('formImgProfile')
const alerOploadImgprofile= document.getElementById('alerOploadImgprofile')
const btnUpdateImg= document.getElementById('btnUpdateImg')

let isUploadMode = false
alerOploadImgprofile.style.display = 'none'

btnUpdateImg.addEventListener('click', () => {
    if (isUploadMode) {
        alerOploadImgprofile.style.display = 'none'
        btnUpdateImg.innerHTML = `
            <span class="material-symbols-outlined">
                upload_file
            </span>
            Cambiar imagen de perfil
        `;
    } else {
       
        alerOploadImgprofile.style.display = 'block';
        btnUpdateImg.innerHTML = `
            <span class="material-symbols-outlined">
                cancel
            </span>
            Cancelar
        `;
    }
    
    isUploadMode = !isUploadMode
});


formImgProfile.addEventListener('submit', (e)=>{
    e.preventDefault()
    const formData = new FormData(formImgProfile)
    
    console.log(formData)
    fetch('/api/users/postImgProfile',
    {
        method: 'POST',
        body:formData
          
    }
    )
    .then(response => response.json())
    .then(result => {
        if (result.status === "success") {
            window.location.replace('/userData')
        } else {
            alert('Lo siento, hubo un error al cargar la imagen, vuelve a intentarlo más tarde')
            console.error("Error al subir archivos");
        }
    })
})
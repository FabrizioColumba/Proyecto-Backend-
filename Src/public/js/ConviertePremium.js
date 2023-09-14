const btnGetPremium= document.getElementById('btnGetPremium')
btnGetPremium.addEventListener('click', ()=>{
    const userId = btnGetPremium.getAttribute('data-user-id');
  fetch('/api/session/convertToPremium',
  {
    method: 'POST',
    headers: {
        'Content-Type':'application/json'
    },
    body: JSON.stringify({ userId })
  })
  .then(response=> response.json())
  .then(data=> {
    if(data.status === "success"){
      window.location.replace('/login')
    }
  })
  })
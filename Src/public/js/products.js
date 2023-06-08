
const titulo = document.getElementById("h1");

const add_frm = document.getElementsByClassName("add_frm")

titulo.innerHTML = "Productos Disponibles";

for (let i = 0; i <= add_frm.length; i++) {
    add_frm[i].addEventListener("submit", async (evt)=>{
        evt.preventDefault(); 
        const data = new FormData(add_frm[i])
        const prod = {};
        data.forEach((value, key) => (prod[key] = value));
        
        const pid = prod.id
        const cid = "646e6f33a94663109938a5da"

        await fetch(`/api/carts/${cid}/products/${pid}`,{
            method:"PUT",
            headers: {
                "Content-Type":"aplication/json"
            },
            body:JSON.stringify(prod),
        } )
    })
}


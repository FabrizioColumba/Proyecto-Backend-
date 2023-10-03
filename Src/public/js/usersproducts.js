

document.addEventListener('DOMContentLoaded', function() {
    const deleteButtons = document.querySelectorAll('.btnDeleteUserProduct');
  
    deleteButtons.forEach(button => {
      button.addEventListener('click', function() {
        const pid = button.getAttribute('data-product-id')
        console.log(pid)
        if (pid) {
          const confirmMessage = "Seguro deseas borrar el producto?";
          const userConfirmed = window.confirm(confirmMessage);
  
          if (userConfirmed) {
            fetch(`/api/products/deleteProduct/${pid}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ pid: pid })
            })
              .then(response => response.json())
              .then(data => {
                if (data.status === "success") {
                  alert('Producto eliminado!')
                }
              })
              .catch(error => {
                console.error('Error:', error);
              })
          }
        }
      })
    })
  })
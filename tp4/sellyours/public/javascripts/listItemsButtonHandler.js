const buttons = document.querySelectorAll('.buy')
buttons.forEach(button => {
    button.addEventListener('click', async event => {
        event.preventDefault()
        if(confirm("Voulez-vous acheter cet objet ?")) {
            const attr = button.attributes
            const itemId = attr.getNamedItem('data_id').value

            const requestOptions = { 
                method :'PUT',
                headers: { 'Content-Type': 'application/json' },
                body : JSON.stringify({
                    sellerId : attr.getNamedItem('user_id').value
                })                    
            }
            const response = await fetch(`/buy/${itemId}`, requestOptions);
            if (response.ok) {
                const itemBought = await response.json();
                sessionStorage.setItem('lastBought', JSON.stringify(itemBought))
                window.location.href = '/users/me';
            }
            else {
                const error = await response.json();
                alert(error.message)
            }
        }
    })
})

document.querySelector('#me').addEventListener('click', event => {
    event.preventDefault()
    window.location.href = '/users/me'
})

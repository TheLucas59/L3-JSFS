document.querySelector('#sell').addEventListener('click', event => {
    event.preventDefault()
    window.location.href = "/item/"
})

document.querySelector('#listAll').addEventListener('click', event => {
    event.preventDefault()
    window.location.href = "/item/others"
})

document.querySelector('#logout').addEventListener('click', event => {
    event.preventDefault()
    window.location.href = "/access/logout"
})

const lastBought = JSON.parse(sessionStorage.getItem('lastBought'))
if(lastBought != null) {
    document.querySelector('#lastBoughtName').innerHTML = lastBought.name
    document.querySelector('#lastBoughtDescription').innerHTML = lastBought.description
    document.querySelector('#lastBoughtPrice').innerHTML = lastBought.price
    document.querySelectorAll('.lastBought').forEach(item => {
        item.style.display = "inline"
    })
}

const creditTrigger = document.querySelector('#money')
const creditValue = document.querySelector('#creditValue')
const creditButton = document.querySelector('#credit')
creditTrigger.addEventListener('click', () => {
    creditTrigger.style.display = 'none'
    creditValue.style.display = 'inline'
    creditButton.style.display = 'inline'
})

creditButton.addEventListener('click', async () => {
    const amount = creditValue.value
    if(confirm(`Voulez-vous créditer votre compte de ${amount}€ supplémentaire ?`)) {
        const body = {
            amountToAdd : parseInt(amount)
        }
        const requestOptions = {
            method : 'PUT',
            headers: { 'Content-Type': 'application/json' },                   
            body : JSON.stringify(body)
        }
        const response = await fetch(`/users/me/money`, requestOptions)
        if (response.ok) {
            alert("Votre compte a été crédité avec succès.")
            window.location.href = '/users/me';
        }
        else {
            const error = await response.json();
            document.getElementById('problem').textContent = `erreur : ${error.message}`;
        }
    }
})

const deleteButtons = document.querySelectorAll('.delete')
deleteButtons.forEach(button => {
    button.addEventListener('click', async event => {
        if(confirm("Voulez-vous retirer cet objet de la vente ?")) {
            const attr = button.attributes
            const itemId = attr.getNamedItem('data_id').value

            const requestOptions = { 
                method :'DELETE',
                headers: { 'Content-Type': 'application/json' },                   
            }
            const response = await fetch(`/item/${itemId}`, requestOptions);
            if (response.ok) {
                window.location.href = '/users/me';
            }
            else {
                const error = await response.json();
                document.getElementById('problem').textContent = `erreur : ${error.message}`;
            }
        }
    })
})
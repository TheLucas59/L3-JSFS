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

const modifyButtons = document.querySelectorAll('.modify')
const value = document.querySelectorAll('#modifyValue')
const valueButton = document.querySelectorAll('#value')
modifyButtons.forEach(button => {
    const number = button.getAttribute('number')
    button.addEventListener('click', () => {
        button.style.display = 'none'
        value.forEach(val => {
            if(val.getAttribute('number') == number) {
                val.style.display = 'inline'
            }
        })
        valueButton.forEach(butt => {
            if(butt.getAttribute('number') == number) {
                butt.style.display = 'inline'
            }
        })
    })
})

valueButton.forEach(button => {
    button.addEventListener('click', async () => {
        const number = button.getAttribute('number')
        let value = 0
        let itemId = "";
        const modifyButtons = document.querySelectorAll('.modify')
        const valueInputs = document.querySelectorAll('#modifyValue')
        valueInputs.forEach(val => {
            if(val.getAttribute('number') == number) {
                value = parseInt(val.value)
            }
        })
        modifyButtons.forEach(modButt => {
            if(modButt.getAttribute('number') == number) {
                itemId = modButt.getAttribute('data_id')
            }
        })
        if(confirm(`Voulez-vous modifier le prix de cet objet à ${value} ?`)) {
            const body = {
                newValue : value,
            }
            const requestOptions = { 
                method :'PUT',
                headers: { 'Content-Type': 'application/json' },
                body : JSON.stringify(body)                   
            }
            const response = await fetch(`/item/${itemId}/price`, requestOptions);
            if (response.ok) {
                alert("Le prix de cet objet a été mis à jour.")
                window.location.href = '/users/me';
            }
            else {
                const error = await response.json();
                document.getElementById('problem').textContent = `erreur : ${error.message}`;
            }
        }
    })
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
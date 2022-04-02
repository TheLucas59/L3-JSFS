document.querySelector('#me').addEventListener('click', event => {
    event.preventDefault()
    window.location.href = '/users/me'
})

document.querySelector('#itemdata').addEventListener('submit', event => {
    event.preventDefault()
    const handler = new ItemHandler()
    handler.submit()
})

class ItemHandler {

    async submit() {
        const itemName = document.querySelector('#itemName')
        const itemDescription = document.querySelector('#description')
        const itemPrice = document.querySelector('#price')
        const itemData = {
            name : itemName.value,
            description : itemDescription.value,
            price : itemPrice.value,
        }
        const body = JSON.stringify(itemData);
        const requestOptions = {
                          method : 'POST',
                          headers : { "Content-Type": "application/json" },
                          body : body
                        };
        const response = await fetch("/item", requestOptions)
        if(response.ok) {
            alert(`L'objet ${itemName.value} a été mis en vente avec succès.`)
            window.location.href = '/users/me'
        }
        else {
            const error = await response.json();
            document.querySelector('#problem').textContent = `erreur : ${error.message}`;
        }
    }
}
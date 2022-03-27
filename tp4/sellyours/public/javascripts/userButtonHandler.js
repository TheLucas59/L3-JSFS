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
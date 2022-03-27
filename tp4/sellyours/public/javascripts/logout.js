const redirect = () => {
    sessionStorage.removeItem('lastBought')
    window.location.href = '/access/login'
}

setTimeout(redirect, 1500) 
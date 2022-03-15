document.querySelector('#userdata').addEventListener('submit', event => {
    event.preventDefault()
    const handler = new RegistrationHandler()
    handler.submit()
})

class RegistrationHandler {
    async submit() {
        const nameInput = document.querySelector('#username')
        const passwordInput = document.querySelector('#password')
        const requestOptions = { 
            method :'POST',
            headers: { 'Content-Type': 'application/json' },
            body : JSON.stringify({
                name : nameInput.value,
                password : passwordInput.value
            })                    
        };
        const response = await fetch(`/access/register`, requestOptions);
        if (response.ok) {
            const createdUser = await response.json();
            window.location.href = '/access/login';
        }
        else {
            const error = await response.json();
            document.getElementById('problem').textContent = `erreur : ${error.message}`;
        }
    }
}
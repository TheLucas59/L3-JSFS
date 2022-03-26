document.querySelector('#userdata').addEventListener('submit', event => {
  event.preventDefault()
  const handler = new LoginHandler()
  handler.submit()
})

class LoginHandler {

  async submit() {
    const userlogin = document.querySelector('#username');
    const userpassword = document.querySelector('#password');
    const userData = { login : userlogin.value, password : userpassword.value };
    const body = JSON.stringify(userData);
    const requestOptions = {
                          method : 'POST',
                          headers : { "Content-Type": "application/json" },
                          body : body
                        };
    const response = await fetch(`/access/login`, requestOptions);
    if (response.ok) {
      window.location.href = '/users/me';
    }
    else {
      const error = await response.json();
      document.querySelector('#problem').textContent = `erreur : ${error.message}`;
    }
  }
}

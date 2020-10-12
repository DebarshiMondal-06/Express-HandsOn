const auth = async (data, type) => {
    try {
        const url = (type === 'login')
            ? '/api/v1/users/login'
            : '/api/v1/users/signup'

        const res = await axios({
            method: 'post',
            url: url,
            data
        });
        if (res.data.status === 'Success') {
            alert('Login Successfully');
            document.querySelector('.text-login').textContent = 'Redirecting......';
            document.getElementById("btn-dis").disabled = true;
            window.setTimeout(() => {
                location.assign('/');
            }, 2000);
        }
    } catch (error) {
        if (error.response.data.status === 'error') {
            alert(error.response.data.message)
            document.querySelector('.text-login').textContent = 'Try Again'
        }
        else {
            alert('Something went wrong!')
            document.querySelector('.text-login').textContent = 'Try Again Later!'
        }
    }
}


document.querySelector('.login--form').addEventListener('submit', async (e) => {
    e.preventDefault();
    document.querySelector('.text-login').textContent = 'Logging In....'
    const email = document.getElementById('email').value;
    const C_password = document.getElementById('password').value;
    await auth({ email, C_password }, 'login');
});



document.querySelector('.signup--form').addEventListener('submit', async (e) => {
    e.preventDefault();
    document.querySelector('.text-update').textContent = 'Creating....'
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('Confirmpassword').value;
    await auth({ name, email, password, confirmPassword }, 'signup');
});
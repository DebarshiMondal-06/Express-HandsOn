const auth = async (data, type) => {
    try {
        const url = (type === 'login') 
        ? '/api/v1/users/login' 
        : '/api/v1/users/signup'

        console.log(url);
        const res = await axios({
            method: 'post',
            url: url,
            data
        });
        console.log(url);
         if (res.data.status === 'Success') {
            alert('Login Successfully');
            window.setTimeout(() => {
                location.assign('/');
            }, 1000);
        }
    } catch (error) {
         if (error.response.data.status === 'error') {
            alert(error.response.data.message)
        }
        else {
            alert('Something went wrong!')
            setTimeout(() => {
                location.assign('/me')
            });
        }
    }
}

if(document.querySelector('.login--form'))
{
    document.querySelector('.login--form').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const C_password = document.getElementById('password').value;
        auth({email, C_password}, 'login');
    });
}


document.querySelector('.signup--form').addEventListener('submit',async (e) => {
    e.preventDefault();
    document.querySelector('.text-update').textContent = 'Creating....'
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('Confirmpassword').value;
    await auth({name, email, password, confirmPassword }, 'signup');
    document.querySelector('.text-update').textContent = 'SignUp'
});
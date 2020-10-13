const textChange = async (id, value) => {
    return document.querySelector(id).textContent = value;
}


const getLogin = document.querySelector('.login--form');
const getSignup = document.querySelector('.signup--form');


const getValue = (id) => {
    return document.getElementById(id).value;
}

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
            await textChange('.text-login', 'Redirecting...');
            document.getElementById("btn-dis").disabled = true;
            window.setTimeout(() => {
                location.assign('/');
            }, 2000);
        }
    } catch (error) {
        if (error.response.data.status === 'error') {
            alert(error.response.data.message)
            await textChange('.text-login', 'Try Again');
        }
        else {
            alert('Something went wrong!')
            await textChange('.text-login', 'Try Again Later!');
        }
    }
}


if (getLogin) {
    getLogin.addEventListener('submit', async (e) => {
        e.preventDefault();
        await textChange('.text-login', 'Logging In....');
        const email = getValue('email');
        const C_password = getValue('password');
        await auth({ email, C_password }, 'login');
    });
}



if (getSignup) {
    getSignup.addEventListener('submit', async (e) => {
        e.preventDefault();
        await textChange('.text-login', 'Creating....');
        const name = getValue('name');
        const email = getValue('email');
        const password = getValue('password');
        const confirmPassword = getValue('Confirmpassword');
        await auth({ name, email, password, confirmPassword }, 'signup');
    });
}
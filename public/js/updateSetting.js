const updateData = async (data, type) => {
    try {

        const url = (type === 'password')
            ? '/api/v1/users/UpdateMyPassword'
            : '/api/v1/users/updateMe'

        const res = await axios({
            method: 'put',
            url: url,
            data
        });
        if (res.data.message === 'Success') {
            alert('Updated!');
            window.setTimeout(() => {
                location.assign('/me');
            }, 800);
        }
    } catch (error) {
        if (error) {
            alert(error.response.data.message)
            window.setTimeout(() => {
                location.assign('/me')
            }, 800);  
        }
    }
}


document.querySelector('.form-user-data').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const name = document.getElementById('name').value;
    updateData({ name, email }, 'data')
});

document.querySelector('.form-user-settings').addEventListener('submit', (e) => {
    e.preventDefault();
    const currentPassword = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    updateData({ currentPassword, password, passwordConfirm }, 'password')
});


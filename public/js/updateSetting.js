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
                location.reload();
            }, 1000);
        }
    } catch (error) {
        if (error.response.data.status === 'error') {
            alert(error.response.data.message)
            document.querySelector('.textChanging').textContent = 'Try Again'
        }
        else {
            alert('Something went wrong!')
            setTimeout(() => {
                location.reload();
            });
        }
    }
}


document.querySelector('.form-user-data').addEventListener('submit', (e) => {
    e.preventDefault();
    document.querySelector('.textChanging').textContent = 'Updating....'
    const form = new FormData();
    form.append('name', document.getElementById('name').value)
    form.append('email', document.getElementById('email').value)
    form.append('photo', document.getElementById('photo').files[0])
    updateData(form, 'data');
});

document.querySelector('.form-user-settings').addEventListener('submit', async (e) => {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'updating....'

    const currentPassword = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await updateData({ currentPassword, password, passwordConfirm }, 'password')

    document.querySelector('.btn--save-password').textContent = 'Save password';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
});


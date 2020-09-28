const updateData = async (name, email) => {
    try {

        const url = (type === 'password') ? 
            ''

        const res = await axios({
            method: 'put',
            url: '/api/v1/users/updateMe',
            data: {
                email: email,
                name: name
            }
        });
        if (res.data.message === 'Success') {
            alert('Updated!');
            window.setTimeout(() => {
                location.assign('/me');
            }, 800);
        }
    } catch (error) {
        if (error) {
            window.setTimeout(() => {
                location.assign('/me')
            }, 800);
        }
        else {
            alert(`Update didn't Work! Try again Later`);
        }
    }
}


document.querySelector('.form-user-data').addEventListener('submit', (e) => {
    e.preventDefault();
    const useremail = document.getElementById('email').value;
    const username = document.getElementById('name').value;
    updateData(username, useremail)
});


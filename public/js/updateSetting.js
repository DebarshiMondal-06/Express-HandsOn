const updateData = async (name, email) => {
    try {
        const res = await axios({
            method: 'put',
            url: '/api/v1/users/updateMe',
            data: {
                email: email,
                name: name
            }
        });
        if (res.data.message === 'Success') {
            // alert('Updated!');
            // window.setTimeout(() => {
            //     location.assign('/me');
            // }, 500);
            mdb.Alert.getInstance(document.getElementById('#placement-example')).show();
        }
    } catch (error) {
        if (error.response.data.message === 'fail') {
            window.setTimeout(() => {
                location.assign('/me')
            }, 800);
        }
        else {
            // alert('Something went wrong! Try again Later')
            mdb.Alert.getInstance(document.getElementById('.main')).show();
        }
    }
}

document.querySelector('.form-user-data').addEventListener('submit', (e) => {
    e.preventDefault();
    const useremail = document.getElementById('email').value;
    const username = document.getElementById('name').value;
    updateData(username, useremail)
});


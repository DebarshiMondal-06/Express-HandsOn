const forgotPass = document.querySelector('.forgotpass');

const forgot = async (data) => {
  console.log(data);
  try {
    const result = await axios({
      method: 'post',
      url: '/api/v1/users/forgotPassword',
      data
    });
    if (result.data.status === 'Success') {
      alert('Successfully Sent!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1000);
    }
  } catch (error) {
    if (error.response.data.status === 'error') {
      alert(error.response.data.message)
      document.getElementById('btn-dis').textContent = 'Try Again';
      document.getElementById("btn-dis").disabled = false;
    }
  }
}

if (forgotPass) {
  forgotPass.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.getElementById('btn-dis').textContent = 'Checking...';
    document.getElementById("btn-dis").disabled = true;
    const email = document.getElementById('email').value;


    await forgot({ email });
  });
}

const resetForm = document.querySelector('.reset--form');

const reset = async (data, tokenId) => {
  try {
    const result = await axios({
      method: 'patch',
      url: `/api/v1/users/resetPasswordSent/${tokenId}`,
      data
    });
    if (result.data.status === 'Success') {
      alert('Successfully Reset Password!');
      window.setTimeout(() => {
        location.assign('/login');
      }, 1000);
    }
  } catch (error) {
    if (error.response.data.status === 'error') {
      alert(error.response.data.message)
      document.getElementById('btn-dis-reset').textContent = 'Try Again';
      document.getElementById("btn-dis-reset").disabled = false;
    }
  }
}

if (resetForm) {
  resetForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.getElementById('btn-dis-reset').textContent = 'Checking...';
    document.getElementById("btn-dis-reset").disabled = true;
    const password = document.getElementById('passwordReset').value;
    const confirmpass = document.getElementById('passwordResetConfirm').value;
    const { token } = e.target.dataset;
    await reset({ password, confirmpass }, token);
  });
}
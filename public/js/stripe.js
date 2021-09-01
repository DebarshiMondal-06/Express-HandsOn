const stripe = Stripe('pk_test_51HZbb3EUlZ5XQUGLif8EezPUDENcXAEtHaPHuQEzg2gQqvcEXUu4i2PvCsrluOr4YZap6cWPiqYT5wWFc8NSr0eM000Z9C3aI1');



const bookTour = async (tourId) => {
  try {
    const session = await axios(`/api/v1/bookings/checkout/${tourId}`)
    // console.log(session);

    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    })

  } catch (error) {
    alert(`${error} Failed!`)
  }
}

document.getElementById('book-tour').addEventListener('click', (e) => {
  e.target.textContent = 'Processing....'
  const { tourId } = e.target.dataset;
  bookTour(tourId);
})
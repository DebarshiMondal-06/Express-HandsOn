const stripe = Stripe('pk_test_1HZbb3EUlZ5XQUGLif8EezPUDENcXAEtHaPHuQEzg2gQqvcEXUu4i2PvCsrluOr4YZap6cWPiqYT5wWFc8NSr0eM000Z9C3aI1');

const bookTour = async (tourId) => {
  const session = await axios(`/api/v1/bookings/checkout/${tourId}`)
  console.log(session);
}

document.getElementById('book-tour').addEventListener('click', (e) => {
  const { tourId } = e.target.dataset;
  bookTour(tourId);
})